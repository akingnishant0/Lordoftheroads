import { LeadAdapter } from "./types";
import { FacebookAdapter } from "./facebookAdapter";
import { GoogleAdapter } from "./googleAdapter";
import { JustdialAdapter } from "./justdialAdapter";
import { GenericAdapter } from "./genericAdapter";
import { PartnerAdapter } from "./partnerAdapter";

export * from "./types";
export * from "./facebookAdapter";
export * from "./googleAdapter";
export * from "./justdialAdapter";
export * from "./genericAdapter";
export * from "./partnerAdapter";

const adapters: Record<string, LeadAdapter> = {
  FACEBOOK: new FacebookAdapter(),
  GOOGLE: new GoogleAdapter(),
  JUSTDIAL: new JustdialAdapter(),
  GENERIC: new GenericAdapter(),
  PARTNER: new PartnerAdapter(),
  BOOKING_COM: new PartnerAdapter(),
  MAKEMYTRIP: new PartnerAdapter(),
};

export function getAdapter(platform: string): LeadAdapter | null {
  const normalized = platform.toUpperCase().trim();
  return adapters[normalized] || null;
}
