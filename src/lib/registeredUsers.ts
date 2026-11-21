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
    if (typeof process !== "undefined" && process.env.NEXT_RUNTIME === "edge") {
      return null;
    }
    if (typeof window === "undefined" && typeof process !== "undefined") {
      const modName = "path";
      const pathMod = require(modName);
      const cwdFn = process["cwd"];
      if (typeof cwdFn === "function") {
        return pathMod.join(cwdFn.call(process), ".user_registry.json");
      }
    }
  } catch {}
  return null;
}

export function getRegisteredUsers(): StoredUser[] {
  try {
    const file = getStorageFile();
    if (file) {
      const fsModName = "fs";
      const fsMod = require(fsModName);
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
      const fsModName = "fs";
      const fsMod = require(fsModName);
      fsMod.writeFileSync(file, JSON.stringify(inMemoryUsers, null, 2), "utf8");
    }
  } catch (e) {
    // In-memory already updated
  }
}
