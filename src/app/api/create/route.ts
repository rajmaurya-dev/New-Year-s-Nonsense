import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resolution = await db.resolution.create({
      data: {
        title: body.title,
        userId: body.userId,
        creatorName: body.creatorName,
        category: body.category,
        isCompleted: false,
        points: {
          create: body.points.map((point: { content: string }) => ({
            content: point.content,
            isCompleted: false,
          })),
        },
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

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, userId, pointId, isCompleted } = body;

    // If updating a specific point
    if (pointId) {
      const point = await db.resolutionPoint.findUnique({
        where: { id: pointId },
        include: { resolution: true },
      });

      if (!point || point.resolution.userId !== userId) {
        return NextResponse.json(
          { message: "Unauthorized or point not found" },
          { status: 403 }
        );
      }

      const updatedPoint = await db.resolutionPoint.update({
        where: { id: pointId },
        data: {
          isCompleted,
          completedAt: isCompleted ? new Date() : null,
        },
      });

      return NextResponse.json(updatedPoint, { status: 200 });
    }

    // If updating the main resolution
    const resolution = await db.resolution.findUnique({
      where: { id },
    });

    if (!resolution || resolution.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized or resolution not found" },
        { status: 403 }
      );
    }

    const updatedResolution = await db.resolution.update({
      where: { id },
      data: {
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    return NextResponse.json(updatedResolution, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update completion status" },
      { status: 500 }
    );
  }
}