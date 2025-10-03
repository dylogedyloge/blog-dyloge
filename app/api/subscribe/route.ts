import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email: string = (body.email || "").trim();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const GAS_URL = process.env.GAS_URL;
    const GAS_SECRET = process.env.GAS_SECRET;

    if (!GAS_URL || !GAS_SECRET) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("secret", GAS_SECRET);
    params.append("source", "website");

    const resp = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => null);
      return NextResponse.json(
        { error: "Failed to save", details: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
