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

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const resolution = await db.resolution.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!resolution) {
      return NextResponse.json(
        { message: "Resolution not found!" },
        { status: 404 }
      );
    }

    if (resolution.userId !== body.userId) {
      return NextResponse.json(
        { message: "You do not have permission to delete this resolution!" },
        { status: 403 }
      );
    }

    const deletedResolution = await db.resolution.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(deletedResolution, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 }
    );
  }
}
