import { prisma } from "@/lib/prisma";

export interface LogWebhookParams {
  platform: string;
  endpoint: string;
  method?: string;
  headers?: any;
  payload: any;
  ipAddress?: string | null;
  status: "SUCCESS" | "FAILED" | "DUPLICATE_IGNORED" | "SIGNATURE_INVALID" | "DISABLED";
  leadId?: string | null;
  errorMessage?: string | null;
  processedIn?: number;
}

export async function logWebhookEvent(params: LogWebhookParams) {
  try {
    return await prisma.webhookLog.create({
      data: {
        platform: params.platform,
        endpoint: params.endpoint,
        method: params.method || "POST",
        headers: params.headers ? sanitizeHeaders(params.headers) : undefined,
        payload: params.payload ?? {},
        ipAddress: params.ipAddress || null,
        status: params.status,
        leadId: params.leadId || null,
        errorMessage: params.errorMessage || null,
        processedIn: params.processedIn || null,
      },
    });
  } catch (err) {
    console.error("Failed to write webhook audit log:", err);
    return null;
  }
}

/**
 * Filter out sensitive authorization tokens and passwords before logging headers
 */
function sanitizeHeaders(headers: any): Record<string, string> {
  const sanitized: Record<string, string> = {};
  const entries: [string, any][] =
    typeof headers?.entries === "function"
      ? (Array.from(headers.entries()) as [string, any][])
      : Object.entries(headers || {});

  for (const [k, v] of entries) {
    const lowerKey = String(k).toLowerCase();
    if (
      lowerKey.includes("authorization") ||
      lowerKey.includes("secret") ||
      lowerKey.includes("token") ||
      lowerKey.includes("cookie")
    ) {
      sanitized[String(k)] = "[REDACTED]";
    } else {
      sanitized[String(k)] = String(v);
    }
  }

  return sanitized;
}

/**
 * Fetch integration configuration for a platform from DB
 */
export async function getIntegrationConfig(platform: string) {
  return prisma.integrationConfig.findUnique({
    where: { platform: platform.toUpperCase() },
  });
}
