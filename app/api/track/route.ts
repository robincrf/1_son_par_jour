import { NextResponse } from "next/server";
import { getCurrentTrack } from "@/lib/track";

export async function GET() {
    const track = await getCurrentTrack();
    return NextResponse.json(track);
}
