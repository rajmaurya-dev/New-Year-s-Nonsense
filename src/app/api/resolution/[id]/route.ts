import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const id = params.id;
    const resolution = await db.resolution.findUnique({
      where: {
        id: id as string,
        // userId: userId!,
      },
    });

    if (!resolution) {
      return NextResponse.json(
        { message: "Resolution not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(resolution, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
}
