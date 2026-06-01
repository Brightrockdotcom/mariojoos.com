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

    // --- Anti-spam ---
    // Honeypot: real users never fill the hidden "website" field.
    const honeypot = String(body.website ?? "").trim();
    if (honeypot) {
      console.warn("Contact spam blocked by honeypot");
      return NextResponse.json({ success: true });
    }
    // Time check: real visitors take >= 1.5s; bots usually submit instantly.
    const loadedAt = Number(body._t);
    if (Number.isFinite(loadedAt) && Date.now() - loadedAt < 1500) {
      console.warn("Contact spam blocked by time check");
      return NextResponse.json({ success: true });
    }

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
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "Mario Joos Website <notifications@mariojoos.com>",
            to: [TO_EMAIL],
            reply_to: email,
            subject: `New inquiry from ${name}`,
            text,
          }),
        });
        if (!r.ok) {
          console.error("Resend send failed:", r.status, await r.text().catch(() => ""));
        }
      } catch (err) {
        console.error("Resend request error:", err);
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
