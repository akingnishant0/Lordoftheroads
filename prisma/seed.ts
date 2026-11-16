import { PrismaClient, Role, ServiceType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Lord of the Road database seed...");

  // 1. Shared password hash for seed users
  const hash = await bcrypt.hash("Admin@123", 12);

  // 2. Upsert SuperAdmin
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@lordoftheroad.in" },
    update: {
      name: "Super Admin",
      phone: "9999900001",
      passwordHash: hash,
      role: Role.SUPER_ADMIN,
      status: "ACTIVE",
    },
    create: {
      name: "Super Admin",
      email: "admin@lordoftheroad.in",
      phone: "9999900001",
      passwordHash: hash,
      role: Role.SUPER_ADMIN,
      status: "ACTIVE",
    },
  });
  console.log(`👤 Seeded SuperAdmin: ${superAdmin.email}`);

  // 3. Upsert Office
  const office = await prisma.office.upsert({
    where: { code: "LOTR-DEL-01" },
    update: {
      name: "Lord of the Road – Delhi",
      address: "123 Connaught Place, New Delhi",
      city: "New Delhi",
      state: "Delhi",
      pinCodes: [
        "110001",
        "110002",
        "110003",
        "110004",
        "110005",
        "110006",
        "110007",
        "110008",
        "110009",
        "110010",
      ],
      email: "delhi@lordoftheroad.in",
      phone: "011-23456789",
      isActive: true,
    },
    create: {
      code: "LOTR-DEL-01",
      name: "Lord of the Road – Delhi",
      address: "123 Connaught Place, New Delhi",
      city: "New Delhi",
      state: "Delhi",
      pinCodes: [
        "110001",
        "110002",
        "110003",
        "110004",
        "110005",
        "110006",
        "110007",
        "110008",
        "110009",
        "110010",
      ],
      email: "delhi@lordoftheroad.in",
      phone: "011-23456789",
      isActive: true,
    },
  });
  console.log(`🏢 Seeded Office: ${office.name} (${office.code})`);

  // 4. Upsert Office Admin
  const officeAdmin = await prisma.user.upsert({
    where: { email: "office@lordoftheroad.in" },
    update: {
      name: "Delhi Office Manager",
      phone: "9999900002",
      passwordHash: hash,
      role: Role.OFFICE_ADMIN,
      status: "ACTIVE",
      officeId: office.id,
    },
    create: {
      name: "Delhi Office Manager",
      email: "office@lordoftheroad.in",
      phone: "9999900002",
      passwordHash: hash,
      role: Role.OFFICE_ADMIN,
      status: "ACTIVE",
      officeId: office.id,
    },
  });
  console.log(`👤 Seeded Office Admin: ${officeAdmin.email}`);

  // 5. Upsert Agent
  const agent = await prisma.user.upsert({
    where: { email: "agent@lordoftheroad.in" },
    update: {
      name: "Rahul Agent",
      phone: "9999900003",
      passwordHash: hash,
      role: Role.AGENT,
      status: "ACTIVE",
      officeId: office.id,
    },
    create: {
      name: "Rahul Agent",
      email: "agent@lordoftheroad.in",
      phone: "9999900003",
      passwordHash: hash,
      role: Role.AGENT,
      status: "ACTIVE",
      officeId: office.id,
    },
  });
  console.log(`👤 Seeded Agent: ${agent.email}`);

  // 6. Create AgentProfile for agent
  const agentProfile = await prisma.agentProfile.upsert({
    where: { userId: agent.id },
    update: {
      officeId: office.id,
      agencyName: "Rahul Travels",
      kycVerified: true,
      coveragePinCodes: ["110001", "110002", "110003"],
    },
    create: {
      userId: agent.id,
      officeId: office.id,
      agencyName: "Rahul Travels",
      kycVerified: true,
      coveragePinCodes: ["110001", "110002", "110003"],
    },
  });
  console.log(`📑 Seeded Agent Profile for: ${agentProfile.agencyName}`);

  // 7. Upsert Customer
  const customer = await prisma.user.upsert({
    where: { email: "customer@lordoftheroad.in" },
    update: {
      name: "Priya Customer",
      phone: "9999900004",
      passwordHash: hash,
      role: Role.CUSTOMER,
      status: "ACTIVE",
    },
    create: {
      name: "Priya Customer",
      email: "customer@lordoftheroad.in",
      phone: "9999900004",
      passwordHash: hash,
      role: Role.CUSTOMER,
      status: "ACTIVE",
    },
  });
  console.log(`👤 Seeded Customer: ${customer.email}`);

  // 8. Create CommissionRule for HOLIDAY_PACKAGE
  const commissionRule = await prisma.commissionRule.upsert({
    where: { serviceType: ServiceType.HOLIDAY_PACKAGE },
    update: {
      percentage: 10.0,
      isActive: true,
    },
    create: {
      serviceType: ServiceType.HOLIDAY_PACKAGE,
      percentage: 10.0,
      isActive: true,
    },
  });
  console.log(
    `💰 Seeded Commission Rule: ${commissionRule.serviceType} -> ${commissionRule.percentage}%`
  );

  // 9. Summary output
  console.log(`
===========================================================
🎉 Seed data created successfully!
===========================================================
Default Password for all accounts: Admin@123

Available Logins:
-----------------------------------------------------------
1. Super Admin:   admin@lordoftheroad.in     (Role: SUPER_ADMIN)
2. Office Admin:  office@lordoftheroad.in    (Role: OFFICE_ADMIN)
3. Travel Agent:  agent@lordoftheroad.in     (Role: AGENT)
4. Customer:      customer@lordoftheroad.in  (Role: CUSTOMER)
===========================================================
`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed execution error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
