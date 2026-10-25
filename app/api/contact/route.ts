import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  MAX_UPLOAD_BYTES,
  hasAllowedExtension,
  sanitizeFilename,
} from "@/lib/upload";

// Sender and recipient come from environment variables so they can be switched in
// Vercel without a code change. The fallbacks are Resend's shared test sender, which
// can only deliver to the email address of the Resend account itself.
// After verifying scdc.com.np in Resend, set in Vercel:
//   CONTACT_FROM = SCDC Website <noreply@scdc.com.np>
//   CONTACT_TO   = info@scdc.com.np
const DEFAULT_FROM = "SCDC Website <onboarding@resend.dev>";
const DEFAULT_TO = "info.scdcnepal@gmail.com";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional().or(z.literal("")),
  email: z.string().email(),
  phone: z.string().max(50).optional().or(z.literal("")),
  country: z.string().max(100).optional().or(z.literal("")),
  service: z.string().min(1).max(100),
  message: z.string().min(1).max(5000),
});

export async function POST(request: Request) {
  let payload: unknown;
  let upload: File | null = null;

  const contentType = request.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const entries: Record<string, string> = {};
      form.forEach((value, key) => {
        if (typeof value === "string") entries[key] = value;
      });
      payload = entries;

      // Browsers send an empty file part when nothing was chosen, so ignore size 0.
      const fileEntry = form.get("file");
      if (fileEntry && typeof fileEntry !== "string" && fileEntry.size > 0) {
        upload = fileEntry;
      }
    } else {
      payload = await request.json();
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, company, email, phone, country, service, message } = parsed.data;

  // Re-check the file on the server: the browser checks can be bypassed.
  if (upload && upload.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: "File too large" }, { status: 413 });
  }
  if (upload && !hasAllowedExtension(upload.name)) {
    return NextResponse.json({ ok: false, error: "Unsupported file type" }, { status: 415 });
  }

  const attachmentName = upload ? sanitizeFilename(upload.name) : null;

  const lines = [
    "New enquiry from SCDC website",
    "",
    "Name:     " + name,
    "Company:  " + (company || "-"),
    "Email:    " + email,
    "Phone:    " + (phone || "-"),
    "Country:  " + (country || "-"),
    "Service:  " + service,
    "",
    "Attachment: " +
      (upload && attachmentName
        ? attachmentName + " (" + Math.ceil(upload.size / 1024) + " KB)"
        : "none"),
    "",
    "Message:",
    message,
  ];

  const emailBody = lines.join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM || DEFAULT_FROM,
    to: process.env.CONTACT_TO || DEFAULT_TO,
    reply_to: email,
    subject: "New enquiry from " + name + " - " + service,
    text: emailBody,
    attachments:
      upload && attachmentName
        ? [
            {
              filename: attachmentName,
              // Base64 string: the format the Resend API documents for attachments.
              content: Buffer.from(await upload.arrayBuffer()).toString("base64"),
            },
          ]
        : undefined,
  });

  if (error) {
    console.error("[contact] resend error:", error);
    return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }

  console.log("[contact] enquiry sent:", email, service);

  return NextResponse.json({ ok: true });
}
