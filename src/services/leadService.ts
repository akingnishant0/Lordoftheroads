import { prisma } from "@/lib/prisma";
import { generateLeadNumber } from "@/lib/utils";
import { LeadSource, LeadStatus, ServiceType, Role } from "@prisma/client";

export interface CreateLeadInput {
  name: string;
  phone: string;
  email?: string | null;
  pinCode?: string | null;
  destination?: string | null;
  serviceType?: ServiceType;
  source?: LeadSource;
  travelDateStart?: Date | string | null;
  travelDateEnd?: Date | string | null;
  paxAdults?: number;
  paxChildren?: number;
  budgetMin?: number | null;
  budgetMax?: number | null;
  message?: string | null;
  createdById?: string | null;
  officeId?: string | null;
  assignedAgentId?: string | null;
  rawPayload?: any;
  externalId?: string | null;
}

export interface LeadFilterParams {
  status?: LeadStatus | "ALL";
  source?: LeadSource | "ALL";
  serviceType?: ServiceType | "ALL";
  search?: string;
  officeId?: string;
  assignedAgentId?: string;
  pinCode?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface CurrentUserContext {
  id: string;
  role: Role;
  officeId?: string | null;
}

const DEDUP_WINDOW_HOURS = 48;

// In-Memory fallback store when database server is not reachable
let inMemoryLeads: any[] = [
  {
    id: "lead-demo-1",
    leadNumber: "LD-20261024-1001",
    source: LeadSource.WEBSITE,
    serviceType: ServiceType.HOLIDAY_PACKAGE,
    name: "Amit Verma",
    phone: "9876543210",
    email: "amit.verma@example.com",
    pinCode: "110001",
    destination: "Goa Beach Holiday",
    paxAdults: 2,
    paxChildren: 0,
    budgetMin: 25000,
    budgetMax: 40000,
    message: "Looking for a 4-star beach resort in North Goa with breakfast included.",
    status: LeadStatus.NEW,
    followUpDate: new Date(Date.now() + 86400000).toISOString(),
    officeId: "demo-office-delhi",
    office: { id: "demo-office-delhi", name: "Lord of the Road – Delhi Connaught Place", code: "LOTR-DEL-01", city: "New Delhi" },
    assignedAgentId: "demo-agent",
    assignedAgent: { id: "demo-agent", name: "Rahul Travel Agent", phone: "9999900003" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: [
      {
        id: "note-1",
        author: { name: "System", role: "SUPER_ADMIN" },
        content: "Auto-routed to Delhi Branch via Pin Code 110001.",
        createdAt: new Date().toISOString(),
      },
    ],
    _count: { notes: 1 },
  },
  {
    id: "lead-demo-2",
    leadNumber: "LD-20261024-1002",
    source: LeadSource.FACEBOOK,
    serviceType: ServiceType.HOLIDAY_PACKAGE,
    name: "Sunita Sharma",
    phone: "9812345678",
    email: "sunita.sharma@example.com",
    pinCode: "110002",
    destination: "Kashmir Paradise (Srinagar & Gulmarg)",
    paxAdults: 4,
    paxChildren: 2,
    budgetMin: 80000,
    budgetMax: 120000,
    message: "Family vacation for 6 days with houseboat stay and snow activities in Gulmarg.",
    status: LeadStatus.CONTACTED,
    followUpDate: new Date(Date.now() + 172800000).toISOString(),
    officeId: "demo-office-delhi",
    office: { id: "demo-office-delhi", name: "Lord of the Road – Delhi Connaught Place", code: "LOTR-DEL-01", city: "New Delhi" },
    assignedAgentId: "demo-agent",
    assignedAgent: { id: "demo-agent", name: "Rahul Travel Agent", phone: "9999900003" },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    notes: [
      {
        id: "note-2",
        author: { name: "Rahul Travel Agent", role: "AGENT" },
        content: "Called customer. Shared 5N/6D itinerary options on WhatsApp.",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
    _count: { notes: 1 },
  },
  {
    id: "lead-demo-3",
    leadNumber: "LD-20261024-1003",
    source: LeadSource.JUSTDIAL,
    serviceType: ServiceType.HOTEL,
    name: "Rajesh Khanna",
    phone: "9823456789",
    email: "rajesh.k@example.com",
    pinCode: "302001",
    destination: "Jaipur Heritage Havelis",
    paxAdults: 2,
    paxChildren: 0,
    budgetMin: 15000,
    budgetMax: 25000,
    message: "Need 2 nights heritage stay near Hawa Mahal with airport pickup.",
    status: LeadStatus.QUOTE_SENT,
    followUpDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    officeId: "demo-office-jaipur",
    office: { id: "demo-office-jaipur", name: "Lord of the Road – Jaipur MI Road", code: "LOTR-JAI-01", city: "Jaipur" },
    assignedAgentId: "demo-agent-2",
    assignedAgent: { id: "demo-agent-2", name: "Pooja Sharma", phone: "9999900005" },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date().toISOString(),
    notes: [],
    _count: { notes: 0 },
  },
  {
    id: "lead-demo-4",
    leadNumber: "LD-20261024-1004",
    source: LeadSource.GOOGLE,
    serviceType: ServiceType.HOLIDAY_PACKAGE,
    name: "Neha Gupta",
    phone: "9834567890",
    email: "neha.gupta@example.com",
    pinCode: "110005",
    destination: "Kerala Backwaters & Munnar",
    paxAdults: 2,
    paxChildren: 0,
    budgetMin: 40000,
    budgetMax: 60000,
    message: "Honeymoon package with private pool villa and houseboat.",
    status: LeadStatus.BOOKED,
    officeId: "demo-office-delhi",
    office: { id: "demo-office-delhi", name: "Lord of the Road – Delhi Connaught Place", code: "LOTR-DEL-01", city: "New Delhi" },
    assignedAgentId: "demo-agent",
    assignedAgent: { id: "demo-agent", name: "Rahul Travel Agent", phone: "9999900003" },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
    notes: [],
    _count: { notes: 0 },
  },
];

export async function createLead(input: CreateLeadInput) {
  const normalizedPhone = input.phone.trim().replace(/\D/g, "").slice(-10);
  const normalizedEmail = input.email?.trim().toLowerCase() || null;
  const dedupCutoff = new Date(Date.now() - DEDUP_WINDOW_HOURS * 60 * 60 * 1000);

  try {
    // 1. Database path
    const existingLead = await prisma.lead.findFirst({
      where: {
        OR: [
          { phone: { endsWith: normalizedPhone } },
          ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
        ],
        createdAt: { gte: dedupCutoff },
        status: { notIn: [LeadStatus.LOST] },
      },
      include: {
        office: true,
        assignedAgent: { select: { id: true, name: true, phone: true } },
      },
    });

    if (existingLead) {
      await prisma.leadNote.create({
        data: {
          leadId: existingLead.id,
          authorId: existingLead.createdById || existingLead.assignedAgentId || (await getSystemUserId()),
          content: `Duplicate inquiry received via ${input.source || "WEBSITE"} for ${input.destination || "travel"}. Message: "${input.message || "N/A"}"`,
        },
      });

      return {
        lead: existingLead,
        isDuplicate: true,
        message: "Lead already exists within 48h deduplication window. Updated existing record.",
      };
    }

    let targetOfficeId = input.officeId || null;
    let targetAgentId = input.assignedAgentId || null;

    if (!targetOfficeId && input.pinCode && input.pinCode.trim().length === 6) {
      const cleanPin = input.pinCode.trim();
      const matchingOffices = await prisma.office.findMany({
        where: { isActive: true, pinCodes: { has: cleanPin } },
        include: { agents: { where: { kycVerified: true }, include: { user: true } } },
      });

      if (matchingOffices.length > 0) {
        const office = matchingOffices[0];
        targetOfficeId = office.id;
        const pinCoveredAgent = office.agents.find(a => a.coveragePinCodes.includes(cleanPin));
        if (pinCoveredAgent && pinCoveredAgent.user.status === "ACTIVE") {
          targetAgentId = pinCoveredAgent.userId;
        } else if (office.agents.length > 0) {
          const activeAgent = office.agents.find(a => a.user.status === "ACTIVE");
          if (activeAgent) targetAgentId = activeAgent.userId;
        }
      }
    }

    const leadNumber = generateLeadNumber();

    const lead = await prisma.lead.create({
      data: {
        leadNumber,
        source: input.source || LeadSource.WEBSITE,
        serviceType: input.serviceType || ServiceType.HOLIDAY_PACKAGE,
        name: input.name.trim(),
        phone: normalizedPhone,
        email: normalizedEmail,
        pinCode: input.pinCode?.trim() || null,
        destination: input.destination?.trim() || null,
        travelDateStart: input.travelDateStart ? new Date(input.travelDateStart) : null,
        travelDateEnd: input.travelDateEnd ? new Date(input.travelDateEnd) : null,
        paxAdults: input.paxAdults ?? 1,
        paxChildren: input.paxChildren ?? 0,
        budgetMin: input.budgetMin ?? null,
        budgetMax: input.budgetMax ?? null,
        message: input.message?.trim() || null,
        status: LeadStatus.NEW,
        officeId: targetOfficeId,
        assignedAgentId: targetAgentId,
        createdById: input.createdById || null,
        rawPayload: input.rawPayload || undefined,
        externalId: input.externalId || null,
      },
      include: {
        office: true,
        assignedAgent: { select: { id: true, name: true, phone: true } },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: input.createdById || null,
        action: "LEAD_CREATED",
        entity: "Lead",
        entityId: lead.id,
        details: `Lead ${lead.leadNumber} created via ${lead.source} for ${lead.name} (${lead.phone}).`,
      },
    }).catch(() => {});

    return { lead, isDuplicate: false, message: "Lead created successfully" };
  } catch (dbErr) {
    console.warn("Database offline, processing lead in memory:", (dbErr as any)?.message);

    // In-memory fallback
    const existing = inMemoryLeads.find(
      (l) => l.phone.slice(-10) === normalizedPhone && l.status !== LeadStatus.LOST
    );

    if (existing) {
      existing.notes.push({
        id: `note-${Date.now()}`,
        author: { name: "System", role: "AGENT" },
        content: `Duplicate inquiry received via ${input.source || "WEBSITE"}. "${input.message || "N/A"}"`,
        createdAt: new Date().toISOString(),
      });
      existing._count.notes = existing.notes.length;
      return { lead: existing, isDuplicate: true, message: "Lead duplicate noted in memory." };
    }

    const newLeadNumber = generateLeadNumber();
    const newLead = {
      id: `mem-${Date.now()}`,
      leadNumber: newLeadNumber,
      source: input.source || LeadSource.WEBSITE,
      serviceType: input.serviceType || ServiceType.HOLIDAY_PACKAGE,
      name: input.name.trim(),
      phone: normalizedPhone,
      email: normalizedEmail,
      pinCode: input.pinCode || null,
      destination: input.destination || "Custom Travel",
      paxAdults: input.paxAdults || 1,
      paxChildren: input.paxChildren || 0,
      budgetMin: input.budgetMin || null,
      budgetMax: input.budgetMax || null,
      message: input.message || null,
      status: LeadStatus.NEW,
      officeId: "demo-office-delhi",
      office: { name: "Lord of the Road – Delhi Connaught Place", city: "New Delhi" },
      assignedAgentId: "demo-agent",
      assignedAgent: { name: "Rahul Travel Agent", phone: "9999900003" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [],
      _count: { notes: 0 },
    };

    inMemoryLeads.unshift(newLead);
    return { lead: newLead, isDuplicate: false, message: "Lead captured in memory." };
  }
}

async function getSystemUserId(): Promise<string> {
  try {
    const admin = await prisma.user.findFirst({
      where: { role: Role.SUPER_ADMIN },
      select: { id: true },
    });
    return admin?.id || "system";
  } catch {
    return "system";
  }
}

export function buildLeadWhereClause(params: LeadFilterParams, user: CurrentUserContext) {
  const where: any = {};

  if (user.role === Role.SUPER_ADMIN) {
    if (params.officeId) where.officeId = params.officeId;
    if (params.assignedAgentId) where.assignedAgentId = params.assignedAgentId;
  } else if (user.role === Role.OFFICE_ADMIN) {
    if (user.officeId) where.officeId = user.officeId;
    if (params.assignedAgentId) where.assignedAgentId = params.assignedAgentId;
  } else if (user.role === Role.AGENT) {
    where.assignedAgentId = user.id;
  } else if (user.role === Role.CUSTOMER) {
    where.createdById = user.id;
  }

  if (params.status && params.status !== "ALL") where.status = params.status;
  if (params.source && params.source !== "ALL") where.source = params.source;
  if (params.serviceType && params.serviceType !== "ALL") where.serviceType = params.serviceType;
  if (params.pinCode) where.pinCode = { startsWith: params.pinCode.trim() };

  if (params.search && params.search.trim()) {
    const q = params.search.trim();
    where.OR = [
      { leadNumber: { contains: q, mode: "insensitive" } },
      { name: { contains: q, mode: "insensitive" } },
      { phone: { contains: q } },
      { email: { contains: q, mode: "insensitive" } },
      { destination: { contains: q, mode: "insensitive" } },
      { pinCode: { contains: q } },
    ];
  }

  return where;
}

export async function getLeads(params: LeadFilterParams, user: CurrentUserContext) {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(params.limit) || 20));
  const skip = (page - 1) * limit;

  try {
    const where = buildLeadWhereClause(params, user);
    const [leads, totalCount] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          office: { select: { id: true, name: true, code: true, city: true } },
          assignedAgent: { select: { id: true, name: true, phone: true, email: true } },
          _count: { select: { notes: true } },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    if (leads.length > 0 || totalCount > 0) {
      return {
        leads,
        pagination: { page, limit, totalCount, totalPages: Math.ceil(totalCount / limit) },
      };
    }
  } catch (dbErr) {
    console.warn("Database offline, filtering leads from memory:", (dbErr as any)?.message);
  }

  // Memory fallback
  let filtered = [...inMemoryLeads];

  if (user.role === Role.OFFICE_ADMIN && user.officeId) {
    filtered = filtered.filter((l) => !l.officeId || l.officeId === user.officeId);
  } else if (user.role === Role.AGENT) {
    filtered = filtered.filter((l) => l.assignedAgentId === user.id || l.assignedAgentId === "demo-agent");
  }

  if (params.status && params.status !== "ALL") {
    filtered = filtered.filter((l) => l.status === params.status);
  }
  if (params.source && params.source !== "ALL") {
    filtered = filtered.filter((l) => l.source === params.source);
  }
  if (params.serviceType && params.serviceType !== "ALL") {
    filtered = filtered.filter((l) => l.serviceType === params.serviceType);
  }
  if (params.search && params.search.trim()) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.leadNumber.toLowerCase().includes(q) ||
        (l.destination && l.destination.toLowerCase().includes(q))
    );
  }

  const paginated = filtered.slice(skip, skip + limit);
  return {
    leads: paginated,
    pagination: {
      page,
      limit,
      totalCount: filtered.length,
      totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
    },
  };
}

export async function getLeadStats(user: CurrentUserContext) {
  try {
    const baseWhere = buildLeadWhereClause({}, user);
    const [total, newCount, contacted, quoteSent, booked, lost] = await Promise.all([
      prisma.lead.count({ where: baseWhere }),
      prisma.lead.count({ where: { ...baseWhere, status: LeadStatus.NEW } }),
      prisma.lead.count({ where: { ...baseWhere, status: LeadStatus.CONTACTED } }),
      prisma.lead.count({ where: { ...baseWhere, status: LeadStatus.QUOTE_SENT } }),
      prisma.lead.count({ where: { ...baseWhere, status: LeadStatus.BOOKED } }),
      prisma.lead.count({ where: { ...baseWhere, status: LeadStatus.LOST } }),
    ]);

    if (total > 0) {
      return { TOTAL: total, NEW: newCount, CONTACTED: contacted, QUOTE_SENT: quoteSent, BOOKED: booked, LOST: lost };
    }
  } catch (dbErr) {
    console.warn("Database offline, calculating stats from memory:", (dbErr as any)?.message);
  }

  const scoped = inMemoryLeads.filter((l) => {
    if (user.role === Role.AGENT) return l.assignedAgentId === user.id || l.assignedAgentId === "demo-agent";
    if (user.role === Role.OFFICE_ADMIN && user.officeId) return !l.officeId || l.officeId === user.officeId;
    return true;
  });

  return {
    TOTAL: scoped.length,
    NEW: scoped.filter((l) => l.status === LeadStatus.NEW).length,
    CONTACTED: scoped.filter((l) => l.status === LeadStatus.CONTACTED).length,
    QUOTE_SENT: scoped.filter((l) => l.status === LeadStatus.QUOTE_SENT).length,
    BOOKED: scoped.filter((l) => l.status === LeadStatus.BOOKED).length,
    LOST: scoped.filter((l) => l.status === LeadStatus.LOST).length,
  };
}

export async function getLeadById(id: string, user: CurrentUserContext) {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        office: true,
        assignedAgent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            agentProfile: { select: { agencyName: true, walletBalance: true } },
          },
        },
        createdBy: { select: { id: true, name: true, role: true } },
        notes: {
          include: { author: { select: { id: true, name: true, role: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (lead) return lead;
  } catch (dbErr) {
    console.warn("Database offline, fetching lead from memory:", (dbErr as any)?.message);
  }

  return inMemoryLeads.find((l) => l.id === id) || null;
}

export async function updateLead(id: string, data: any, user: CurrentUserContext) {
  try {
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (existing) {
      return await prisma.lead.update({
        where: { id },
        data: {
          ...(data.status && { status: data.status }),
          ...(data.lostReason !== undefined && { lostReason: data.lostReason }),
          ...(data.followUpDate !== undefined && {
            followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
          }),
          ...(data.officeId !== undefined && { officeId: data.officeId }),
          ...(data.assignedAgentId !== undefined && { assignedAgentId: data.assignedAgentId }),
        },
        include: {
          office: true,
          assignedAgent: { select: { id: true, name: true, phone: true } },
        },
      });
    }
  } catch (dbErr) {
    console.warn("Database offline, updating lead in memory:", (dbErr as any)?.message);
  }

  const memIndex = inMemoryLeads.findIndex((l) => l.id === id);
  if (memIndex !== -1) {
    inMemoryLeads[memIndex] = {
      ...inMemoryLeads[memIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return inMemoryLeads[memIndex];
  }

  throw new Error("Lead not found");
}

export async function addLeadNote(leadId: string, content: string, user: CurrentUserContext) {
  try {
    return await prisma.leadNote.create({
      data: { leadId, authorId: user.id, content: content.trim() },
      include: { author: { select: { id: true, name: true, role: true } } },
    });
  } catch (dbErr) {
    console.warn("Database offline, saving note in memory:", (dbErr as any)?.message);
  }

  const memLead = inMemoryLeads.find((l) => l.id === leadId);
  const newNote = {
    id: `note-${Date.now()}`,
    content: content.trim(),
    createdAt: new Date().toISOString(),
    author: { id: user.id, name: user.role === Role.SUPER_ADMIN ? "Super Admin" : "Agent", role: user.role },
  };

  if (memLead) {
    memLead.notes.unshift(newNote);
    memLead._count.notes = memLead.notes.length;
  }

  return newNote;
}

export async function exportLeadsToCsv(params: LeadFilterParams, user: CurrentUserContext) {
  const result = await getLeads(params, user);
  const leads = result.leads;

  const headers = [
    "Lead Number",
    "Created Date",
    "Source",
    "Service Type",
    "Customer Name",
    "Phone",
    "Email",
    "Pin Code",
    "Destination",
    "Adults",
    "Children",
    "Budget Min",
    "Budget Max",
    "Status",
    "Office",
    "Assigned Agent",
  ];

  const rows = leads.map((l: any) => [
    `"${l.leadNumber}"`,
    `"${new Date(l.createdAt).toISOString().split("T")[0]}"`,
    `"${l.source}"`,
    `"${l.serviceType}"`,
    `"${(l.name || "").replace(/"/g, '""')}"`,
    `"${l.phone || ""}"`,
    `"${l.email || ""}"`,
    `"${l.pinCode || ""}"`,
    `"${(l.destination || "").replace(/"/g, '""')}"`,
    l.paxAdults || 1,
    l.paxChildren || 0,
    l.budgetMin || "",
    l.budgetMax || "",
    `"${l.status}"`,
    `"${l.office?.name || ""}"`,
    `"${l.assignedAgent?.name || ""}"`,
  ]);

  return [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\r\n");
}
