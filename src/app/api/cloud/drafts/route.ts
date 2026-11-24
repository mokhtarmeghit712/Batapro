import { NextResponse } from "next/server";
import { getCloudSessionUser, getUserCloudDrafts, saveUserCloudDraft } from "@/lib/cloud/store";
import { CvDraft } from "@/types/cv";

export async function GET() {
  const user = await getCloudSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in to cloud sync" }, { status: 401 });
  const drafts = await getUserCloudDrafts(user.userId);
  return NextResponse.json({ drafts });
}

export async function POST(request: Request) {
  const user = await getCloudSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in to cloud sync" }, { status: 401 });

  const draft = (await request.json()) as CvDraft;
  if (!draft?.id || !draft?.data) {
    return NextResponse.json({ error: "Invalid draft payload" }, { status: 400 });
  }
  const drafts = await saveUserCloudDraft(user.userId, draft);
  return NextResponse.json({ drafts });
}
