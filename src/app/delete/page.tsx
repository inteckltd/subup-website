import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete your account",
  description:
    "How to delete your SubUp account and associated personal data, in the app or by emailing Inteck Ltd.",
  alternates: { canonical: "/delete" },
};

const deletionMailto = `mailto:${site.email}?subject=${encodeURIComponent("SubUp account deletion request")}`;

export default function DeleteAccountPage() {
  return (
    <LegalPage
      kicker="Account"
      title="Delete your account"
      intro="Request deletion of your SubUp account and the personal data we hold with it."
    >
      <h2>In the app</h2>
      <p>
        If you still have SubUp installed: open <strong>Settings → Delete account</strong>.
        That deletes the account immediately.
      </p>

      <h2>By email</h2>
      <p>
        If you have uninstalled the app, email{" "}
        <a href={deletionMailto}>{site.email}</a> with the subject “SubUp account
        deletion request”. Include:
      </p>
      <ul>
        <li>The UK mobile number on the account</li>
        <li>The name on the account</li>
        <li>Optional email if you added one</li>
      </ul>
      <p>
        We will confirm the request and delete the account. We aim to reply within two
        working days and to complete deletion within 30 days.
      </p>
      <p>
        <a
          href={deletionMailto}
          className="bg-primary text-primary-foreground hover:bg-navy-hover mt-2 inline-flex rounded-2xl px-[18px] py-3 font-bold no-underline"
        >
          Email a deletion request
        </a>
      </p>

      <h2>What we delete</h2>
      <p>
        Your login, profile, memberships, upcoming game spots, photos we store for you,
        push tokens, and the personal data needed to run the account.
      </p>
      <p>
        Past games may still show a placeholder (“Deleted user”) so scores and history
        for other players stay intact. If you are the last admin of a group that still
        has members, promote someone else first. Groups where you are the only member
        are deleted with your account.
      </p>

      <h2>What we may keep</h2>
      <p>
        Payment records (amounts, status, Stripe identifiers) may be kept where Stripe
        or the law requires it — for example tax, refunds, or disputes. We do not keep
        your password or full card numbers.
      </p>
    </LegalPage>
  );
}
