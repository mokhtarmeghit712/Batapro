import { promises as fs } from "fs";
import path from "path";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { CvDraft } from "@/types/cv";

const STORE_PATH = path.join(process.cwd(), ".batapro-cloud.json");
const COOKIE_NAME = "batapro_cloud_session";

interface CloudUserRecord {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  createdAt: string;
}

interface CloudStoreData {
  users: CloudUserRecord[];
  draftsByUser: Record<string, CvDraft[]>;
}

function getSecret(): Uint8Array {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || "batapro-free-forever-jwt-secret-2026"
  );
}

async function readStore(): Promise<CloudStoreData> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw) as CloudStoreData;
  } catch {
    return { users: [], draftsByUser: {} };
  }
}

async function writeStore(data: CloudStoreData): Promise<void> {
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function registerOrLoginCloudUser(params: {
  email: string;
  password: string;
  fullName?: string;
}) {
  const store = await readStore();
  const email = params.email.toLowerCase().trim();
  let user = store.users.find((u) => u.email === email);

  if (!user) {
    user = {
      id: `u_${Date.now()}`,
      email,
      fullName: params.fullName?.trim() || email.split("@")[0],
      passwordHash: await bcrypt.hash(params.password, 10),
      createdAt: new Date().toISOString(),
    };
    store.users.push(user);
    store.draftsByUser[user.id] = [];
    await writeStore(store);
  } else {
    const ok = await bcrypt.compare(params.password, user.passwordHash);
    if (!ok) {
      throw new Error("Invalid password for this email");
    }
  }

  const token = await new SignJWT({ userId: user.id, email: user.email, fullName: user.fullName })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("90d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });

  return { id: user.id, email: user.email, fullName: user.fullName };
}

export async function getCloudSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      fullName: String(payload.fullName || ""),
    };
  } catch {
    return null;
  }
}

export async function clearCloudSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getUserCloudDrafts(userId: string): Promise<CvDraft[]> {
  const store = await readStore();
  return store.draftsByUser[userId] ?? [];
}

export async function saveUserCloudDraft(userId: string, draft: CvDraft): Promise<CvDraft[]> {
  const store = await readStore();
  const existing = store.draftsByUser[userId] ?? [];
  const idx = existing.findIndex((d) => d.id === draft.id);
  if (idx >= 0) {
    existing[idx] = draft;
  } else {
    existing.unshift(draft);
  }
  store.draftsByUser[userId] = existing;
  await writeStore(store);
  return existing;
}
