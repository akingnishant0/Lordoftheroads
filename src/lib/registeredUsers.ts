export interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: string;
  status: string;
  languagePref: string;
  officeId?: string | null;
  createdAt: string;
}

// In-memory fallback
let inMemoryUsers: StoredUser[] = [];

function getStorageFile(): string | null {
  try {
    // Only access node modules when running in node runtime (not Edge)
    if (typeof process !== "undefined" && !process.env.NEXT_RUNTIME && typeof (process as any).cwd === "function") {
      const pathMod = require("path");
      return pathMod.join(process.cwd(), ".user_registry.json");
    }
  } catch {}
  return null;
}

export function getRegisteredUsers(): StoredUser[] {
  try {
    const file = getStorageFile();
    if (file) {
      const fsMod = require("fs");
      if (fsMod.existsSync(file)) {
        const data = fsMod.readFileSync(file, "utf8");
        return JSON.parse(data);
      }
    }
  } catch (e) {
    // fallback to in-memory
  }
  return inMemoryUsers;
}

export function saveRegisteredUser(user: StoredUser): void {
  try {
    inMemoryUsers = inMemoryUsers.filter((u) => u.email !== user.email);
    inMemoryUsers.push(user);

    const file = getStorageFile();
    if (file) {
      const fsMod = require("fs");
      fsMod.writeFileSync(file, JSON.stringify(inMemoryUsers, null, 2), "utf8");
    }
  } catch (e) {
    // In-memory already updated
  }
}
