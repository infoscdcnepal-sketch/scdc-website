'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, AlertCircle, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t('errors.nameRequired')),
        company: z.string().optional(),
        email: z
          .string()
          .min(1, t('errors.emailRequired'))
          .email(t('errors.emailInvalid')),
        phone: z.string().optional(),
        country: z.string().min(1, t('errors.countryRequired')),
        service: z.string().min(1, t('errors.serviceRequired')),
        message: z
          .string()
          .min(1, t('errors.messageRequired'))
          .min(10, t('errors.messageMin')),
      }),
    [t]
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus('submitting');
    try {
      // Wire this to your form endpoint (e.g. /api/contact, Formspree, or Resend).
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const fieldError = (key: keyof FormValues) =>
    errors[key] ? (
      <p role="alert" className="mt-1 text-sm font-medium text-red-600">
        {errors[key]?.message}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t('name')} *</Label>
          <Input id="name" autoComplete="name" {...register('name')} />
          {fieldError('name')}
        </div>
        <div>
          <Label htmlFor="company">
            {t('company')}{' '}
            <span className="font-normal text-ink-muted">({t('optional')})</span>
          </Label>
          <Input id="company" autoComplete="organization" {...register('company')} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">{t('email')} *</Label>
          <Input id="email" type="email" autoComplete="email" {...register('email')} />
          {fieldError('email')}
        </div>
        <div>
          <Label htmlFor="phone">
            {t('phone')}{' '}
            <span className="font-normal text-ink-muted">({t('optional')})</span>
          </Label>
          <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="country">{t('country')} *</Label>
          <Input id="country" autoComplete="country-name" {...register('country')} />
          {fieldError('country')}
        </div>
        <div>
          <Label htmlFor="service">{t('service')} *</Label>
          <Select id="service" defaultValue="" {...register('service')}>
            <option value="" disabled>
              {t('servicePlaceholder')}
            </option>
            <option value="shop-drawings">{t('services.shop')}</option>
            <option value="structural-drawings">{t('services.structural')}</option>
            <option value="bim-modeling">{t('services.bim')}</option>
            <option value="general">{t('services.general')}</option>
          </Select>
          {fieldError('service')}
        </div>
      </div>

      <div>
        <Label htmlFor="message">{t('message')} *</Label>
        <Textarea id="message" {...register('message')} />
        {fieldError('message')}
      </div>

      <div>
        <Label htmlFor="file" className="inline-flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-teal" aria-hidden="true" />
          {t('file')}
        </Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept=".pdf,.dwg,.dxf,.zip,.png,.jpg"
          className="h-auto cursor-pointer py-2 file:mr-4 file:rounded-full file:border-0 file:bg-teal-light file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-accent"
        />
      </div>

      <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
        {status === 'submitting' ? t('submitting') : t('submit')}
      </Button>

      <div aria-live="polite">
        {status === 'success' && (
          <p className="flex items-start gap-2 rounded-lg bg-teal-light p-4 text-sm font-medium text-accent">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            {t('success')}
          </p>
        )}
        {status === 'error' && (
          <p className="flex items-start gap-2 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            {t('error')}
          </p>
        )}
      </div>
    </form>
  );
}
