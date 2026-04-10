import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ success: true, note: "Supabase not configured" });
    }

    const body = await req.json();
    const { path, referrer } = body;

    await supabase.from("page_views").insert([
      {
        path: path || "/",
        referrer: referrer || null,
        user_agent: req.headers.get("user-agent") || null,
      },
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to log" }, { status: 500 });
  }
}
