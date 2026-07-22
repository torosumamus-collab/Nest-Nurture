import { NextRequest, NextResponse } from "next/server";

// Stub endpoint. Wire this up to a transactional email provider
// (Resend, Postmark, SendGrid, etc.) or a CRM before going live.
export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    // TODO: send the email / create the CRM record here, e.g.:
    // await resend.emails.send({
    //   from: "Nest & Nurture <hello@nestandnurture.com>",
    //   to: "hello@nestandnurture.com",
    //   subject: `[Contact] ${subject ?? "General"} — ${name}`,
    //   text: message,
    //   replyTo: email,
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
