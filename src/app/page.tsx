import { AppLayout } from '@/components/layout/app-layout';
import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/about/about-section';
import { BookCallSection } from '@/components/contact/book-call-section';
import { ContactScheduleSwitcher } from '@/components/contact/contact-schedule-switcher';
import { KnowledgeSection } from '@/components/knowledge/knowledge-section';

export default function HomePage() {
  return (
    <AppLayout>
      {/* Hero Section with ID Card */}
      <HeroSection />

      {/* About Section with Timeline */}
      <AboutSection />

      {/* Knowledge Section (Studies + Blog) - Prioritized to show authority */}
      <KnowledgeSection />

      {/* Book a Call Section - Simple solid background */}
      <BookCallSection />

      {/* Contact Section with toggle between form and schedule + illustration on the left */}
      <section id="contact" className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl">
              Hit me! 📧
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Have a project in mind or just want to say hello? Use the contact
              form or schedule a time directly — whatever you prefer.
            </p>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left illustration */}
              <div className="hidden lg:flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 rounded-3xl overflow-hidden h-[620px] md:h-[740px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/marcel-scog-bg.jpeg"
                  alt="Illustration accompanying contact methods"
                  className="object-cover w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Right: toggle between form and schedule */}
              <div className="w-full">
                <ContactScheduleSwitcher compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
