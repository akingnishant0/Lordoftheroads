import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getRegisteredUsers, saveRegisteredUser, StoredUser } from "@/lib/registeredUsers";

/**
 * Staff & Administrator Role Assignment API
 * POST /api/admin/roles/assign
 * Allows assigning SUPER_ADMIN, OFFICE_ADMIN, or AGENT roles to any user email.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, role = "OFFICE_ADMIN", name, phone, password } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required to assign admin roles." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const targetRole = role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "OFFICE_ADMIN";

    // 1. Check existing users in persistent store
    const localUsers = getRegisteredUsers();
    let existing = localUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

    let passwordHash = existing?.passwordHash;
    if (!passwordHash && password) {
      passwordHash = await bcrypt.hash(password, 12);
    } else if (!passwordHash) {
      // Default initial password if not provided
      passwordHash = await bcrypt.hash(targetRole === "SUPER_ADMIN" ? "Admin@123" : "Office@123", 12);
    }

    const updatedUser: StoredUser = {
      id: existing ? existing.id : `admin-${Date.now()}`,
      name: name?.trim() || existing?.name || (targetRole === "SUPER_ADMIN" ? "Lord Super Admin" : "Lord Office Operations Admin"),
      email: trimmedEmail,
      phone: phone?.trim() || existing?.phone || "9999900000",
      passwordHash,
      role: targetRole,
      status: "ACTIVE",
      languagePref: "en",
      officeId: targetRole === "OFFICE_ADMIN" ? "main-office-delhi" : null,
      createdAt: existing ? existing.createdAt : new Date().toISOString(),
    };

    // Save to persistent registry
    saveRegisteredUser(updatedUser);

    // Also attempt DB update if reachable
    try {
      await prisma.user.upsert({
        where: { email: trimmedEmail },
        update: {
          role: targetRole as any,
          status: "ACTIVE",
        },
        create: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: trimmedEmail,
          phone: updatedUser.phone,
          passwordHash: updatedUser.passwordHash,
          role: targetRole as any,
          status: "ACTIVE",
          languagePref: "en",
        },
      });
    } catch (dbErr) {
      console.warn("DB offline during admin assignment, saved in persistent registry:", (dbErr as any)?.message);
    }

    return NextResponse.json({
      success: true,
      message: `User ${trimmedEmail} has been successfully assigned the role: ${targetRole}!`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        dashboardUrl: targetRole === "SUPER_ADMIN" ? "/admin" : "/office",
      },
    });
  } catch (error) {
    console.error("Role assignment error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to assign admin role." },
      { status: 500 }
    );
  }
}
