import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { getRegisteredUsers } from "./registeredUsers";
import type { Role } from "@prisma/client";

const DEMO_USERS = [
  {
    id: "demo-admin",
    name: "Super Administrator",
    email: "admin@lordoftheroad.in",
    password: "Admin@123",
    role: "SUPER_ADMIN" as any,
    phone: "9999900001",
    languagePref: "en",
  },
  {
    id: "demo-office",
    name: "Office Operations Admin",
    email: "office@lordoftheroad.in",
    password: "Office@123",
    role: "OFFICE_ADMIN" as any,
    officeId: "demo-office-delhi",
    phone: "9999900002",
    languagePref: "en",
  },
  {
    id: "demo-agent",
    name: "Travel Agent Specialist",
    email: "agent@lordoftheroad.in",
    password: "Agent@123",
    role: "AGENT" as any,
    officeId: "demo-office-delhi",
    phone: "9999900003",
    languagePref: "en",
  },
  {
    id: "demo-calling",
    name: "Calling Staff Lead",
    email: "caller@lordoftheroad.in",
    password: "Caller@123",
    role: "CALLING_STAFF" as any,
    officeId: "demo-office-delhi",
    phone: "9999900005",
    languagePref: "en",
  },
  {
    id: "demo-hotel",
    name: "Heritage Hotel & Homestay Partner",
    email: "hotel@lordoftheroad.in",
    password: "Hotel@123",
    role: "HOTEL_SUPPLIER" as any,
    phone: "9999900006",
    languagePref: "en",
  },
  {
    id: "demo-bus",
    name: "Royal Volvo Bus Fleet Partner",
    email: "bus@lordoftheroad.in",
    password: "Bus@123",
    role: "BUS_OPERATOR" as any,
    phone: "9999900007",
    languagePref: "en",
  },
  {
    id: "demo-cab",
    name: "Outstation Cab & Bike Fleet Partner",
    email: "cab@lordoftheroad.in",
    password: "Cab@123",
    role: "CAB_BIKE_OPERATOR" as any,
    phone: "9999900008",
    languagePref: "en",
  },
  {
    id: "demo-shop",
    name: "Traveling Essentials Store Vendor",
    email: "shop@lordoftheroad.in",
    password: "Shop@123",
    role: "TRAVEL_SHOP_VENDOR" as any,
    phone: "9999900009",
    languagePref: "en",
  },
  {
    id: "demo-customer",
    name: "Customer Portal User",
    email: "customer@lordoftheroad.in",
    password: "Customer@123",
    role: "CUSTOMER" as any,
    phone: "9999900004",
    languagePref: "en",
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "lordoftheroad-dev-secret-key-32-characters-minimum",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        // 1. Try real database first if available
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (user) {
            const isValid = await bcrypt.compare(password, user.passwordHash);
            if (isValid && user.status === "ACTIVE") {
              await prisma.user
                .update({
                  where: { id: user.id },
                  data: { lastLoginAt: new Date() },
                })
                .catch(() => {});

              return {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                languagePref: user.languagePref,
                officeId: user.officeId,
              };
            }
          }
        } catch (dbErr) {
          console.warn("Database not reachable, checking persistent local registry:", (dbErr as any)?.message);
        }

        // 2. Check local persistent registry (offline resilience)
        try {
          const registeredUsers = getRegisteredUsers();
          const regUser = registeredUsers.find((u) => u.email.toLowerCase() === email);
          if (regUser) {
            const isValid = await bcrypt.compare(password, regUser.passwordHash);
            if (isValid) {
              return {
                id: regUser.id,
                name: regUser.name,
                email: regUser.email,
                phone: regUser.phone,
                role: regUser.role as any,
                languagePref: regUser.languagePref,
                officeId: regUser.officeId || null,
              };
            }
          }
        } catch (regErr) {
          console.warn("Local user registry check error:", regErr);
        }

        // 3. Fallback to demo users when database is not yet migrated/reachable
        const demoUser = DEMO_USERS.find(
          (u) => u.email.toLowerCase() === email && u.password === password
        );

        if (demoUser) {
          return {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            phone: demoUser.phone,
            role: demoUser.role,
            languagePref: demoUser.languagePref,
            officeId: (demoUser as any).officeId || null,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role as Role;
        token.phone = (user as any).phone as string;
        token.languagePref = (user as any).languagePref as string;
        token.officeId = (user as any).officeId as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.phone = token.phone as string;
        session.user.languagePref = token.languagePref as string;
        (session.user as any).officeId = token.officeId as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
