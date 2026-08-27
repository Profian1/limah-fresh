import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { SERVICE_TYPES, waLink, SITE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/art/icons";

const VOLUME_OPTIONS = [
  "5,000 Litres",
  "10,000 Litres (1 Bowser)",
  "20,000 Litres (2 Bowsers)",
  "30,000 Litres +",
  "Weekly scheduled supply",
  "Not sure yet — advise me",
];

interface QuoteResult {
  reference: string;
  summary: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "/backend/api";

export function QuoteForm({
  defaultService = "bowser",
  accent = false,
  onDone,
}: {
  defaultService?: string;
  accent?: boolean;
  onDone?: () => void;
}) {
  const [service, setService] = useState(defaultService);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<QuoteResult | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(`${API_BASE}/send-email.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "quote" }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message ?? "Something went wrong. Please try again.");
        return;
      }
      setResult({ reference: json.reference, summary: json.whatsAppSummary });
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="relative flex h-16 w-16 items-center justify-center">
          <span className="animate-ripple absolute inset-0 rounded-full bg-aqua/30" />
          <CheckCircle2 className="h-14 w-14 text-aqua" />
        </span>
        <h3 className="font-display mt-5 text-2xl font-bold text-navy">Quote request received</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Our team will reach out shortly. Your reference number is:
        </p>
        <p className="font-display mt-3 rounded-xl bg-mist/70 px-5 py-2.5 text-lg font-bold tracking-wide text-brand">
          {result.reference}
        </p>
        <a
          href={waLink(result.summary)}
          target="_blank"
          rel="noreferrer"
          className="btn-sheen mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Fast-track on WhatsApp
        </a>
        {onDone && (
          <button onClick={onDone} className="mt-4 text-sm font-semibold text-slate-500 underline-offset-4 hover:text-brand hover:underline">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Service needed</label>
        <select name="serviceType" value={service} onChange={(e) => setService(e.target.value)} className="field">
          {SERVICE_TYPES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Full name *</label>
        <input name="name" required placeholder="Jane Wanjiku" className="field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Company / Institution</label>
        <input name="company" placeholder="e.g. Sunrise Academy" className="field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Phone *</label>
        <input name="phone" required type="tel" placeholder="07XX XXX XXX" className="field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Email</label>
        <input name="email" type="email" placeholder="you@company.co.ke" className="field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Delivery location</label>
        <input name="location" placeholder="Estate / Town / Street" className="field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">
          {service === "bowser" ? "Volume needed" : "Estimated quantity"}
        </label>
        <select name="volume" className="field" defaultValue={VOLUME_OPTIONS[1]}>
          {VOLUME_OPTIONS.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Preferred delivery date</label>
        <input name="deliveryDate" type="date" className="field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand">Anything else?</label>
        <input name="message" placeholder="Access notes, timing, site details…" className="field" />
      </div>

      <input
        name="_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        aria-hidden="true"
      />
      {error && (
        <p className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className={`btn-sheen flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-60 ${
            accent ? "bg-navy shadow-navy/30" : "bg-gradient-to-r from-brand to-aqua shadow-aqua/30"
          }`}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "Sending request…" : "Submit Quote Request"}
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">
          Prefer talking? Call {SITE.phones[0].value} — we respond within business hours.
        </p>
      </div>
    </form>
  );
}
