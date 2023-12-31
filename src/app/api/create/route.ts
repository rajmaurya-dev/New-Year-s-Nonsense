import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resolution = await db.resolution.create({
      data: {
        content: body.content,
        userId: body.userId,
      },
    });
    return NextResponse.json(resolution, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
}
