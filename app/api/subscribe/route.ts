import { NextRequest, NextResponse } from "next/server";

// Stub endpoint. Wire this up to your email service provider
// (Mailchimp, ConvertKit, Klaviyo, Beehiiv, etc.) before going live.
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // TODO: call your ESP's API here, e.g.:
    // await fetch("https://api.youresp.com/v1/subscribers", {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${process.env.ESP_API_KEY}` },
    //   body: JSON.stringify({ email }),
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
