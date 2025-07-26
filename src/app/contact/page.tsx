import { ContactForm } from '@/components/contact/contact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Marcel Scognamiglio',
  description:
    'Get in touch with Marcel for collaboration, consulting, or questions about web, AI, and engineering.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-accent-50 dark:bg-accent-900">
      <section className="w-full max-w-2xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-800 dark:text-primary-200">
          Contact Marcel
        </h1>
        <p className="text-center text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          Fill out the form below to get in touch. I usually respond within 1-2
          business days.
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
