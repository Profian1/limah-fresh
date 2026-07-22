import { waLink, generalInquiryMessage } from "@/lib/site";
import { WhatsAppIcon } from "@/components/art/icons";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(generalInquiryMessage())}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Limah Fresh on WhatsApp"
      className="group fixed bottom-6 right-6 z-[70] flex items-center gap-0"
    >
      <span className="pointer-events-none mr-3 hidden translate-x-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-navy opacity-0 shadow-xl shadow-navy/10 ring-1 ring-mist transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Order on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="animate-ripple absolute inset-0 rounded-full bg-[#25D366]/40" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform duration-300 group-hover:scale-110">
          <WhatsAppIcon className="h-7 w-7" />
        </span>
      </span>
    </a>
  );
}
