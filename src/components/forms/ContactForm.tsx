"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

const SUBJECTS = [
  "General Inquiry",
  "Bottled Water Order",
  "Bulk Bowser Delivery",
  "Dispenser Purchase / Service",
  "Corporate Partnership",
  "Feedback",
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetch("/api/csrf")
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.token))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
      form.reset();
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-xl shadow-navy/5 ring-1 ring-mist">
        <span className="relative flex h-16 w-16 items-center justify-center">
          <span className="animate-ripple absolute inset-0 rounded-full bg-aqua/30" />
          <CheckCircle2 className="h-14 w-14 text-aqua" />
        </span>
        <h3 className="font-display mt-5 text-2xl font-bold text-navy">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Thank you for reaching out — the Limah Fresh team will get back to you shortly, usually within a
          few working hours.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-6 rounded-full border border-mist px-6 py-2.5 text-sm font-bold text-brand transition hover:border-aqua hover:bg-mist/40"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-navy/5 ring-1 ring-mist sm:grid-cols-2 sm:p-8"
    >
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Full name *</label>
        <input name="name" required placeholder="Jane Wanjiku" className="field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Phone</label>
        <input name="phone" type="tel" placeholder="07XX XXX XXX" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Email *</label>
        <input name="email" required type="email" placeholder="you@company.co.ke" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Subject *</label>
        <select name="subject" required className="field" defaultValue={SUBJECTS[0]}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help — delivery volumes, dispenser needs, service requests…"
          className="field resize-none"
        />
      </div>
      {error && (
        <p className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
      )}
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <input
        name="_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        aria-hidden="true"
      />
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading || !csrfToken}
          className="btn-sheen flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-aqua/30 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          {loading ? "Sending…" : "Send Message"}
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">
          Reaches info@limahfresh.co.ke · We reply within business hours.
        </p>
      </div>
    </form>
  );
}
