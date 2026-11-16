import { CreateLeadInput } from "@/services/leadService";

export interface IntegrationConfigData {
  id?: string;
  platform: string;
  isEnabled: boolean;
  apiKey?: string | null;
  apiSecret?: string | null;
  webhookSecret?: string | null;
  additionalConfig?: any;
}

export interface VerificationResult {
  isValid: boolean;
  error?: string;
  statusCode?: number;
}

export interface ParseResult {
  leads: CreateLeadInput[];
  rawPayload?: any;
  externalId?: string | null;
}

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  details?: Record<string, any>;
}

export interface LeadAdapter {
  platformName: string;
  
  verifyRequest(
    req: Request,
    rawBody: string,
    config: IntegrationConfigData
  ): Promise<VerificationResult>;

  parsePayload(
    payload: any,
    config: IntegrationConfigData,
    rawBody?: string
  ): Promise<ParseResult>;

  testConnection(
    config: IntegrationConfigData
  ): Promise<ConnectionTestResult>;
}
