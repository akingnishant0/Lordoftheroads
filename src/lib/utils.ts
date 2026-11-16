/**
 * Common utility functions for Lord of the Road application.
 */

/**
 * Merges CSS class names, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Maps a user role to the corresponding dashboard URL route.
 * SUPER_ADMIN -> '/admin'
 * OFFICE_ADMIN -> '/office'
 * AGENT -> '/agent'
 * CUSTOMER -> '/customer'
 * Default -> '/'
 */
export function getDashboardPath(role: string): string {
  switch (role) {
    case "SUPER_ADMIN":
      return "/admin";
    case "OFFICE_ADMIN":
      return "/office";
    case "AGENT":
    case "CALLING_STAFF":
      return "/agent";
    case "HOTEL_SUPPLIER":
    case "BUS_OPERATOR":
    case "CAB_BIKE_OPERATOR":
    case "TRAVEL_SHOP_VENDOR":
      return "/supplier";
    case "CUSTOMER":
      return "/customer";
    default:
      return "/";
  }
}

/**
 * Formats a Date object or ISO string into 'DD MMM YYYY' format (e.g. '24 Oct 2026').
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";

  const day = String(d.getDate()).padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Formats a numeric amount using Indian currency notation (e.g. '₹1,50,000').
 */
export function formatCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `₹${formatted}`;
}

/**
 * Generates a unique lead reference number formatted as 'LD-YYYYMMDD-XXXX'.
 * XXXX is a random 4-digit number.
 */
export function generateLeadNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random4 = Math.floor(1000 + Math.random() * 9000).toString();

  return `LD-${year}${month}${day}-${random4}`;
}

/**
 * Generates a unique booking reference number formatted as 'LOTR-BK-YYYYMMDD-XXX'.
 * XXX is a random 3-digit number.
 */
export function generateBookingNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random3 = Math.floor(100 + Math.random() * 900).toString();

  return `LOTR-BK-${year}${month}${day}-${random3}`;
}
