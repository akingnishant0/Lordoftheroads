import type { Role } from "@prisma/client";
import { type DefaultSession } from "next-auth";
import "next-auth/jwt";

/**
 * NextAuth v5 type augmentation.
 * Extends the default User, Session, and JWT interfaces to include
 * custom fields: role, phone, and languagePref.
 */
declare module "next-auth" {
  interface User {
    id?: string;
    role?: Role;
    phone?: string;
    languagePref?: string;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      phone: string;
      languagePref: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
    phone?: string;
    languagePref?: string;
  }
}
