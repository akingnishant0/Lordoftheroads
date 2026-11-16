import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getRegisteredUsers, saveRegisteredUser, StoredUser } from "@/lib/registeredUsers";

/**
 * Multi-Role Partner & User Registration Route for Lord of the Road
 * Supports:
 * - CUSTOMER (Traveler)
 * - AGENT (Village & Town Franchise Partner)
 * - HOTEL_SUPPLIER (Resorts, Homestays, Haveli, Camps)
 * - BUS_OPERATOR (Intercity Volvo/BharatBenz Fleets)
 * - CAB_BIKE_OPERATOR (Outstation Cabs, Self-Drive, Bike Rentals)
 * - TRAVEL_SHOP_VENDOR (Car/Bike Mechanics & Roadside Garages, Jungle Dhaba/Restaurants, Travel Gear Stores)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      password,
      role = "CUSTOMER",
      businessName,
      businessType,
      pinCode,
      city,
      state,
      address,
    } = body;

    // Validate presence of core required fields
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, phone number, and password are required.",
        },
        { status: 400 }
      );
    }

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const plainPassword = typeof password === "string" ? password : "";

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Phone format validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      return NextResponse.json(
        { success: false, message: "Mobile number must be exactly 10 digits." },
        { status: 400 }
      );
    }

    if (plainPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Duplicate Check
    let emailExists = false;
    let phoneExists = false;

    try {
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: trimmedEmail },
      });
      if (existingUserByEmail) emailExists = true;

      const existingUserByPhone = await prisma.user.findUnique({
        where: { phone: trimmedPhone },
      });
      if (existingUserByPhone) phoneExists = true;
    } catch (dbErr) {
      // Local fallback check
      const localUsers = getRegisteredUsers();
      if (localUsers.some((u) => u.email.toLowerCase() === trimmedEmail)) emailExists = true;
      if (localUsers.some((u) => u.phone === trimmedPhone)) phoneExists = true;
    }

    if (emailExists) {
      return NextResponse.json(
        { success: false, message: "This email is already registered. Please log in." },
        { status: 409 }
      );
    }

    if (phoneExists) {
      return NextResponse.json(
        { success: false, message: "This phone number is already registered." },
        { status: 409 }
      );
    }

    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(plainPassword, 12);
    const userId = `usr-${Date.now()}`;

    // Valid roles map
    const validRoles = [
      "CUSTOMER",
      "AGENT",
      "HOTEL_SUPPLIER",
      "BUS_OPERATOR",
      "CAB_BIKE_OPERATOR",
      "TRAVEL_SHOP_VENDOR",
    ];

    const finalRole = validRoles.includes(role) ? role : "CUSTOMER";

    const newUserData: StoredUser = {
      id: userId,
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      passwordHash,
      role: finalRole,
      status: "ACTIVE",
      languagePref: "en",
      officeId: null,
      createdAt: new Date().toISOString(),
    };

    // Attempt DB create
    try {
      await prisma.user.create({
        data: {
          id: userId,
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          passwordHash,
          role: finalRole as any,
          status: "ACTIVE",
          languagePref: "en",
        },
      });
    } catch (dbErr) {
      console.warn("DB write bypassed or offline, stored in persistent local registry:", (dbErr as any)?.message);
    }

    // Always persist to local fallback registry for high resilience
    saveRegisteredUser(newUserData);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully! Welcome to Lord of the Road.",
        user: {
          id: userId,
          name: trimmedName,
          email: trimmedEmail,
          role: finalRole,
          phone: trimmedPhone,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred during registration." },
      { status: 500 }
    );
  }
}
