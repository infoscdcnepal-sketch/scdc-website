import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

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

  const contentType = request.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const entries: Record<string, string> = {};
      form.forEach((value, key) => {
        if (typeof value === "string") entries[key] = value;
      });
      payload = entries;
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
    "Message:",
    message,
  ];

  const emailBody = lines.join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "SCDC Website <onboarding@resend.dev>",
    to: "info.scdcnepal@gmail.com",
    reply_to: email,
    subject: "New enquiry from " + name + " - " + service,
    text: emailBody,
  });

  if (error) {
    console.error("[contact] resend error:", error);
    return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }

  console.log("[contact] enquiry sent:", email, service);

  return NextResponse.json({ ok: true });
}
