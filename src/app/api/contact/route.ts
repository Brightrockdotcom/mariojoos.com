import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, budget, newsletter_optin } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json({ success: true, note: "Supabase not configured" });
    }

    const { error } = await supabase.from("contacts").insert([
      {
        name,
        email,
        message,
        budget,
        newsletter_optin: newsletter_optin || false,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
