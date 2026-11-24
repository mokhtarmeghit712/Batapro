import { NextResponse } from "next/server";
import { z } from "zod";
import { enhanceTextWithAI } from "@/lib/ai/enhancer";

const schema = z.object({
  text: z.string().min(3).max(2000),
  language: z.enum(["ar", "fr", "en", "es", "de"]).default("en"),
  kind: z.enum(["bullet", "summary"]).default("bullet"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Provide text to enhance" }, { status: 400 });
    }
    const result = await enhanceTextWithAI(
      parsed.data.text,
      parsed.data.language,
      parsed.data.kind
    );
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Enhancement failed" }, { status: 500 });
  }
}
