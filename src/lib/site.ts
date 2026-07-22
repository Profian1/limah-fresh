export const SITE = {
  name: "Limah Fresh",
  company: "Limah E.A. Limited",
  slogan: "Pure Drinking Water",
  tagline: "Ensuring you love and enjoy your environment",
  incorporated: "November 20, 2013",
  address: "Amee Holdings, North Airport Road",
  poBox: "P.O. Box 36075-00200, Nairobi, Kenya",
  mapQuery: "North Airport Road, Embakasi, Nairobi, Kenya",
  whatsappPrimary: "254718013432",
  phones: [
    { label: "Office Line", value: "011 602 2104", raw: "+254116022104" },
    { label: "Sales & Orders", value: "0718 013 432", raw: "+254718013432" },
    { label: "Customer Care", value: "0718 013 391", raw: "+254718013391" },
    { label: "Deliveries", value: "0722 998 182", raw: "+254722998182" },
  ],
  emails: ["info@limaheastafrica.co.ke", "limaheastafrica@gmail.com"],
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 5:30 PM" },
    { days: "Saturday", time: "8:00 AM – 3:00 PM" },
    { days: "Sunday & Public Holidays", time: "Deliveries on request" },
  ],
};

export const SOCIALS = [
  { platform: "TikTok", href: "#", icon: "tiktok" },
  { platform: "Instagram", href: "#", icon: "instagram" },
  { platform: "Facebook", href: "#", icon: "facebook" },
  { platform: "WhatsApp", href: "#", icon: "whatsapp" },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Bulk & Services" },
  { href: "/contact", label: "Contact Us" },
];

export const CLIENTS = [
  "Posta Kenya",
  "KNEC",
  "Kenya Airports Authority",
  "Kenya Wildlife Service",
  "KICC",
  "Superior Homes",
  "Jamii Sacco",
  "Kisii Teaching & Referral Hospital",
];

/** Stock photography (Pexels) used for atmospheric sections. */
export const PHOTOS = {
  hero: "https://images.pexels.com/photos/32180816/pexels-photo-32180816.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1280",
  plant: "https://images.pexels.com/photos/12726229/pexels-photo-12726229.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1067",
  tanker:
    "https://images.pexels.com/photos/16966615/pexels-photo-16966615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1067",
  dispenser:
    "https://images.pexels.com/photos/7845036/pexels-photo-7845036.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1067",
  bottles:
    "https://images.pexels.com/photos/37933300/pexels-photo-37933300.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  ripple:
    "https://images.pexels.com/photos/8374312/pexels-photo-8374312.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1067",
};

/** WhatsApp deep links with pre-filled order messages. */
export function waLink(message: string, phone: string = SITE.whatsappPrimary) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(name: string, qty: number, volume?: string | null) {
  return [
    "Hello Limah Fresh, I would like to place an order:",
    "",
    `• Product: ${name}${volume ? ` (${volume})` : ""}`,
    `• Quantity: ${qty}`,
    "• Location: [please share your delivery location]",
    "",
    "Thank you.",
  ].join("\n");
}

export function generalInquiryMessage() {
  return "Hello Limah Fresh, I would like to make an inquiry about your products and services.";
}

export function bowserMessage() {
  return [
    "Hello Limah Fresh, I would like to request a water bowser delivery quote.",
    "",
    "• Location: ",
    "• Volume needed: ",
    "• Preferred date: ",
  ].join("\n");
}

export const SERVICE_TYPES = [
  { value: "bowser", label: "Bulk Water Bowser (Limah Soft Water)" },
  { value: "dispenser_maintenance", label: "Dispenser Maintenance & Sanitization" },
  { value: "delivery_contract", label: "Home / Office Delivery Contract" },
  { value: "bulk_bottled", label: "Bulk Bottled Water Order" },
  { value: "general", label: "General Inquiry" },
];

export function serviceLabel(value: string) {
  return SERVICE_TYPES.find((s) => s.value === value)?.label ?? "General Inquiry";
}
