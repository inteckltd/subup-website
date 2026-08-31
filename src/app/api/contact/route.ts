import { NextResponse } from "next/server";
import { ServerClient } from "postmark";
import { z } from "zod";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email(),
  message: z.string().trim().min(10).max(5000),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const serverToken = process.env.POSTMARK_SERVER_TOKEN?.trim();
  const from = process.env.POSTMARK_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;

  if (!serverToken || !from) {
    return NextResponse.json(
      {
        error: `The contact form is not configured yet. Email ${site.email} instead.`,
      },
      { status: 503 },
    );
  }

  try {
    const client = new ServerClient(serverToken);
    await client.sendEmail({
      From: from,
      To: to,
      ReplyTo: parsed.data.email,
      Subject: `SubUp website: ${parsed.data.name}`,
      TextBody: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        "",
        parsed.data.message,
      ].join("\n"),
      MessageStream: "outbound",
    });
  } catch {
    return NextResponse.json(
      { error: `Could not send the message. Email ${site.email} instead.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
