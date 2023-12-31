import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("first");
    const { userId } = auth();
    console.log(userId);
    const resolutions = await db.resolution.findMany({
      where: {
        userId: userId!,
      },
    });
    console.log(resolutions);
    return NextResponse.json(resolutions, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
}
