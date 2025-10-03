"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ You're subscribed!");
        setEmail("");
      } else {
        setStatus(data?.error || "Something went wrong");
      }
    } catch (err) {
      setStatus("Network error — try again later");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="flex items-center gap-2">
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="outline">
          Subscribe
        </Button>
      </div>
      {status && <p className="mt-2 text-sm text-gray-500">{status}</p>}
    </form>
  );
}
