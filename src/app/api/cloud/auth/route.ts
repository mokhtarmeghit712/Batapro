import { NextResponse } from "next/server";
import { z } from "zod";
import {
  clearCloudSession,
  getCloudSessionUser,
  getUserCloudDrafts,
  registerOrLoginCloudUser,
} from "@/lib/cloud/store";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  fullName: z.string().optional(),
});

export async function GET() {
  const user = await getCloudSessionUser();
  if (!user) return NextResponse.json({ user: null, drafts: [] });
  const drafts = await getUserCloudDrafts(user.userId);
  return NextResponse.json({ user, drafts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = authSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Valid email and password (4+ chars) required" }, { status: 400 });
    }
    const user = await registerOrLoginCloudUser(parsed.data);
    const drafts = await getUserCloudDrafts(user.id);
    return NextResponse.json({ user, drafts });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cloud auth failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function DELETE() {
  await clearCloudSession();
  return NextResponse.json({ ok: true });
}
