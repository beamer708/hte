import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAnalyticsSummary } from "@/lib/admin-analytics";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const summary = await getAnalyticsSummary(30);
    return NextResponse.json(summary);
  } catch (error) {
    console.error("admin analytics GET", error);
    return NextResponse.json({ error: "Failed to fetch analytics summary" }, { status: 500 });
  }
}
