import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// Recipient is kept on the server only — it is never exposed to the browser.
const TO_EMAIL = "mario@brightrock.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const channel = String(body.channel ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      channel ? `Channel: ${channel}` : null,
      "",
      message,
    ].filter((l): l is string => l !== null);
    const text = lines.join("\n");

    // 1) Email via Resend REST API (no SDK needed). Recipient is hardcoded above.
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "Mario Joos Website <onboarding@resend.dev>",
            to: [TO_EMAIL],
            reply_to: email,
            subject: `New inquiry from ${name}`,
            text,
          }),
        });
      } catch {
        // fall through to the Supabase record below
      }
    }

    // 2) Also keep a record in Supabase (backup / inbox if email isn't configured).
    if (supabase) {
      try {
        await supabase
          .from("contacts")
          .insert([{ name, email, message: channel ? `Channel: ${channel}\n\n${message}` : message }]);
      } catch {
        // ignore — email above is the primary path
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
