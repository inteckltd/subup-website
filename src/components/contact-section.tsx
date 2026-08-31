import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="bg-background px-6 pb-24 sm:pb-32 lg:px-20">
      <div className="border-border mx-auto grid w-full max-w-[1280px] gap-12 rounded-[48px] border bg-white px-8 py-12 shadow-[0px_10px_40px_-10px_rgba(3,36,136,0.08)] sm:px-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="bg-cyan h-px w-8" />
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
              Support
            </span>
          </div>
          <h2 className="text-primary mb-4 text-[clamp(32px,5vw,56px)] leading-none font-extrabold tracking-[-0.04em]">
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
        <ContactForm />
      </div>
    </section>
  );
}
