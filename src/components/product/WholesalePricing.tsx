import { memo } from "react";
import { Truck, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/art/icons";
import { type WholesalePricingRow, formatPrice } from "@/data/products";
import { waLink } from "@/lib/site";

const WHATSAPP_MESSAGE = `Hello Limah Fresh, I would like to place a bulk/wholesale order.

• Product: LIMAH FRESH WATER
• Pack size: [please specify]
• Quantity: [please specify]
• Location: [please share your delivery location]

Thank you.`;

export const WholesalePricing = memo(function WholesalePricing({
  pricing,
}: {
  pricing: WholesalePricingRow[];
}) {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal>
          <div className="text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-aqua">
              <span className="h-px w-8 bg-aqua" /> Bulk Orders
            </p>
            <h2 className="font-display mt-4 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl md:text-4xl">
              Wholesale & Bulk Pricing
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Get quality Limah Fresh water at competitive wholesale prices.
              Minimum order requirements apply.
            </p>
          </div>
        </Reveal>

        {/* Desktop table */}
        <Reveal delay={120}>
          <div className="mt-10 hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-mist/60 bg-white shadow-lg shadow-navy/5">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="bg-gradient-to-r from-deep to-navy">
                      <th className="w-[160px] px-5 py-4 text-[13px] font-bold uppercase tracking-wider text-foam">
                        Product
                      </th>
                      <th className="px-5 py-4 text-[13px] font-bold uppercase tracking-wider text-foam">
                        Pack Size
                      </th>
                      <th className="px-5 py-4 text-[13px] font-bold uppercase tracking-wider text-foam">
                        Minimum Order
                      </th>
                      <th className="px-5 py-4 text-[13px] font-bold uppercase tracking-wider text-foam">
                        Price / Bottle
                      </th>
                      <th className="px-5 py-4 text-[13px] font-bold uppercase tracking-wider text-foam">
                        Price / Carton
                      </th>
                      <th className="px-5 py-4 text-[13px] font-bold uppercase tracking-wider text-foam">
                        Transport
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricing.map((row, i) => (
                      <tr
                        key={row.packSize}
                        className={
                          i % 2 === 0
                            ? "bg-white"
                            : "bg-ice/50"
                        }
                      >
                        {i === 0 ? (
                          <td
                            rowSpan={pricing.length}
                            className="relative border-r border-mist/40 px-5 py-4 align-middle"
                          >
                            <div className="flex flex-col items-center justify-center text-center">
                              <span className="font-display text-[15px] font-extrabold leading-tight text-deep">
                                LIMAH
                                <br />
                                FRESH
                                <br />
                                WATER
                              </span>
                            </div>
                          </td>
                        ) : null}
                        <td className="px-5 py-4 text-[14px] font-medium text-ink">
                          {row.packSize}
                        </td>
                        <td className="px-5 py-4 text-[14px] font-semibold text-navy">
                          {row.minimumOrder}
                        </td>
                        <td className="px-5 py-4 text-[14px] font-bold text-brand">
                          {formatPrice(row.pricePerBottle)}
                        </td>
                        <td className="px-5 py-4 text-[14px] font-bold text-brand">
                          {formatPrice(row.pricePerCarton)}
                        </td>
                        <td className="px-5 py-4">
                          <span className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-700">
                            <Truck className="h-4 w-4 shrink-0" />
                            {row.transport}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile cards */}
        <Reveal delay={120}>
          <div className="mt-10 md:hidden">
            <div className="rounded-2xl border border-mist/60 bg-white p-4 shadow-lg shadow-navy/5 sm:p-5">
              <div className="mb-4 flex items-center gap-3 border-b border-mist/40 pb-4">
                <span className="font-display text-lg font-extrabold leading-tight text-deep">
                  LIMAH FRESH WATER
                </span>
              </div>
              <div className="space-y-4">
                {pricing.map((row) => (
                  <div
                    key={row.packSize}
                    className="rounded-xl border border-mist/40 bg-ice/30 p-4"
                  >
                    <p className="text-[15px] font-bold text-navy">
                      {row.packSize}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-slate-600">
                      Minimum order: {row.minimumOrder}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Price / Bottle
                        </p>
                        <p className="mt-0.5 text-[16px] font-extrabold text-brand">
                          {formatPrice(row.pricePerBottle)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Price / Carton
                        </p>
                        <p className="mt-0.5 text-[16px] font-extrabold text-brand">
                          {formatPrice(row.pricePerCarton)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-emerald-700">
                      <Truck className="h-4 w-4 shrink-0" />
                      {row.transport}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <p className="text-lg font-bold text-navy sm:text-xl">
              Need a bulk order?
            </p>
            <p className="mt-2 text-base text-slate-600">
              Place your order today and enjoy free delivery within Nairobi.
            </p>
            <a
              href={waLink(WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="btn-sheen mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#22c35e] hover:shadow-xl hover:shadow-[#25D366]/35 sm:px-10 sm:py-4 sm:text-[15px]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Order via WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
});
