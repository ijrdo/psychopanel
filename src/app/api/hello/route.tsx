import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("hello");
  return NextResponse.json({ name: "Helllo" });
}
