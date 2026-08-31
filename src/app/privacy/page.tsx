import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for SubUp. How Inteck Ltd collects, uses, and shares personal data in the SubUp app and on this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy Policy"
      intro="What we collect, why we collect it, who we share it with, and your rights under UK GDPR."
    >
      <p className="text-muted-foreground mb-5 text-xs font-bold tracking-[0.08em] uppercase">
        Version 1.4 · Last updated 26 August 2026
      </p>
      <p>
        {site.company} (“SubUp”, “we”, “us”) is the controller of personal data you
        provide in the SubUp app and on this website. Company number{" "}
        {site.companyNumber}. Registered office: {site.address}
      </p>
      <p>
        Contact: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h3>1. Data we process</h3>
      <ul>
        <li>Name</li>
        <li>UK mobile number (your login)</li>
        <li>Optional email (for receipts and communications later — not used to log in)</li>
        <li>Optional profile photo and group cover images</li>
        <li>Group membership, invites, games, lobby spots, scores, votes, and ratings</li>
        <li>Push notification tokens</li>
        <li>Device diagnostics and crash reports if error reporting is enabled</li>
        <li>
          Payment records (status, amounts, and Stripe identifiers). We do not store
          full card or bank account numbers.
        </li>
        <li>
          If you use this website’s contact form: your name, email address, and message.
        </li>
      </ul>

      <h3>2. Why we process it, and legal bases</h3>
      <ul>
        <li>
          <strong>Contract</strong> — to create your account, run groups and games,
          take and refund payments, and show history and ratings.
        </li>
        <li>
          <strong>Legitimate interests</strong> — security, abuse prevention, product
          reliability, and understanding crashes.
        </li>
        <li>
          <strong>Legal obligation</strong> — where we must keep records, for example
          for tax, refunds, or disputes.
        </li>
        <li>
          <strong>Consent</strong> — analytics and advertising cookies on this website,
          only if you choose Accept.
        </li>
      </ul>

      <h3>3. Who we share it with</h3>
      <p>We use processors to run the service. We do not sell your data.</p>
      <ul>
        <li>Supabase (Postgres, Auth, Storage) — UK/EU region target</li>
        <li>Twilio — password-reset and group-invite SMS</li>
        <li>Expo — push notifications</li>
        <li>Sentry — crash and error reports, if configured</li>
        <li>Stripe, including Stripe Connect — card payments and organiser payouts</li>
        <li>Resend — to deliver messages from this website’s contact form</li>
      </ul>
      <p>
        Group members can see your name, photo, and rating — not your mobile or email —
        through the app. Group admins enter a mobile number to invite you.
      </p>

      <h3>4. Retention</h3>
      <p>
        We keep account data while your account exists and for a short period afterwards
        as needed for security, refunds, and legal claims. Payment records may be kept
        longer where Stripe or the law requires it. Contact-form emails are kept as
        long as needed to handle your request.
      </p>

      <h3>5. Your rights</h3>
      <p>
        Under UK GDPR you can ask for access, rectification, erasure, restriction,
        objection, and portability. You also have the right to complain to the
        Information Commissioner’s Office at{" "}
        <a href="https://ico.org.uk">ico.org.uk</a>.
      </p>
      <p>
        You can delete your account in Settings, or request deletion on the web:{" "}
        <Link href="/delete">Delete your account</Link>. We remove memberships,
        upcoming spots, tokens, and your login. Past game history may show “Deleted
        user”.
      </p>

      <h3>6. Children</h3>
      <p>
        SubUp is intended for adults organising recreational sport. We do not knowingly
        collect data from children. If you think a child has created an account, email
        us and we will delete it.
      </p>

      <h3>7. International transfers</h3>
      <p>
        Some processors (for example Expo, Sentry, Stripe, Twilio, Google, Meta, and
        TikTok) may process data outside the UK. Where that happens they use
        appropriate safeguards such as UK adequacy regulations or standard contractual
        clauses.
      </p>

      <h3>8. Cookies and this website</h3>
      <p>
        The SubUp app does not use browser cookies. This marketing website may use
        cookies and similar technologies after you choose Accept:
      </p>
      <ul>
        <li>Google Analytics 4 — to understand how the site is used</li>
        <li>Google Ads — if we run Google advertising</li>
        <li>Meta Pixel — Facebook and Instagram ads measurement</li>
        <li>TikTok Pixel — TikTok ads measurement</li>
      </ul>
      <p>
        These load only if you accept. Choosing Reject keeps the site working without
        advertising or analytics cookies. You can change your mind by clearing this
        site’s data in your browser. Contact form submissions are emailed to us so we
        can reply; that is not a tracking cookie.
      </p>

      <h3>9. Changes</h3>
      <p>
        If we update this policy, we bump the version in the app and ask you to accept
        again before continuing. Website-only changes are dated on this page.
      </p>
    </LegalPage>
  );
}
