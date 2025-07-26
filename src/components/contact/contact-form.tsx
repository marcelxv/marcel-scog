'use client';

import { useState } from 'react';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  _honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    _honeypot: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [ariaMsg, setAriaMsg] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setAriaMsg('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setSuccessMsg('');
    setErrorMsg('');
    setAriaMsg('');

    // Honeypot check (client side)
    if (form._honeypot && form._honeypot.length > 0) {
      setStatus('error');
      setErrorMsg('Spam detected.');
      setAriaMsg('Spam detected. Submission blocked.');
      return;
    }

    const result = ContactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus('idle');
      setAriaMsg('Please fix the errors in the form.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setSuccessMsg("Thank you for reaching out! I'll get back to you soon.");
        setForm({ name: '', email: '', message: '', _honeypot: '' });
        setAriaMsg('Your message was sent successfully.');
      } else {
        setStatus('error');
        setErrorMsg(
          data.error || 'Something went wrong. Please try again later.'
        );
        setAriaMsg(data.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again later.');
      setAriaMsg('Submission failed. Please try again.');
    }
  }

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-[500px] w-full max-w-4xl mx-auto py-10 px-4 gap-8">
      {/* Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8 bg-neutral-100 dark:bg-neutral-900 rounded-3xl">
        <img
          src="/images/marcel-scog-bg.jpeg"
          alt="Contact Illustration"
          className="object-contain w-full h-full max-h-[400px] rounded-2xl"
        />
      </div>
      {/* Form Card */}
      <div className="w-full md:w-1/2 bg-white dark:bg-neutral-950 rounded-3xl shadow-lg p-8 flex flex-col items-center border border-neutral-200 dark:border-neutral-800">
        <form
          className="w-full space-y-5"
          onSubmit={handleSubmit}
          aria-live="polite"
          aria-describedby="form-status"
        >
          {/* Honeypot field (hidden from users, visible to bots) */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="_honeypot">Leave this field empty</label>
            <input
              type="text"
              id="_honeypot"
              name="_honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={form._honeypot || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block font-semibold text-neutral-800 dark:text-white mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              className={[
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white text-base',
                errors.name
                  ? 'border-red-500'
                  : 'border-neutral-300 dark:border-neutral-700',
              ].join(' ')}
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-neutral-800 dark:text-white mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className={[
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white text-base',
                errors.email
                  ? 'border-red-500'
                  : 'border-neutral-300 dark:border-neutral-700',
              ].join(' ')}
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-semibold text-neutral-800 dark:text-white mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={[
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white text-base resize-none',
                errors.message
                  ? 'border-red-500'
                  : 'border-neutral-300 dark:border-neutral-700',
              ].join(' ')}
              value={form.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p
                id="message-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary-600 text-white font-bold text-base shadow-md hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === 'loading'}
            aria-busy={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          <div id="form-status" className="sr-only" aria-live="polite">
            {ariaMsg}
          </div>
          {status === 'success' && (
            <p className="text-green-600 text-center mt-2" role="status">
              {successMsg}
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center mt-2" role="alert">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
      {/* Mobile illustration */}
      <div className="block md:hidden w-full mt-8 p-6 bg-neutral-100 dark:bg-neutral-900 rounded-2xl">
        <img
          src="/images/marcel-scog-alpha.jpeg"
          alt="Contact Illustration"
          className="object-contain w-full h-40 rounded-lg"
        />
      </div>
    </div>
  );
}
