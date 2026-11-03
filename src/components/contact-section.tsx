import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="bg-background scroll-mt-14 px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-primary mb-3 text-xs font-bold tracking-[0.2em] uppercase">Support</p>
          <h2 className="text-primary mb-4 text-[clamp(28px,4vw,40px)] leading-tight font-extrabold tracking-[-0.03em]">
            Get in touch
          </h2>
          <p className="mb-6 max-w-md">
            Stuck, found a bug, or need help with a payment or account? {site.supportSla}
          </p>
          <p className="text-muted-foreground mb-1">
            Email <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p className="text-muted-foreground m-0">
            Phone <a href={site.phoneHref}>{site.phone}</a>
            {" · "}
            {site.company}, Manchester, UK
          </p>
        </div>
        <div className="border-border rounded-[32px] border bg-white p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
