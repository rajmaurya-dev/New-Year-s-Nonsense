"use client";

import Popup from "@/components/Popup";
import { useResolution } from "@/lib/queries";
import { useAuth } from "@clerk/nextjs";
import { CheckCircle2, LoaderIcon } from "lucide-react";

export default function SharedResolution({
  params,
}: {
  params: { id: string };
}) {
  const { data: resolution, isLoading: resolutionLoading } = useResolution(
    params.id
  );
  const { userId } = useAuth();

  if (resolutionLoading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <LoaderIcon size={48} className="text-blue-700 animate-spin" />
      </div>
    );
  }
  const completedPoints = resolution?.points.filter(
    (point) => point.isCompleted
  ).length;

  const progress =
    ((completedPoints ?? 0) / (resolution?.points?.length ?? 1)) * 100;
  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{resolution?.title}</h1>
            <p className="text-gray-500">
              Created by {resolution?.creatorName}
            </p>
          </div>
        </div>
        <div className="my-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              {completedPoints} of {resolution?.points.length} completed
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-orange-300 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="space-y-4">
          {resolution?.points.map((point) => (
            <div key={point.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`${
                    point.isCompleted ? "text-green-500" : "text-gray-300"
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span
                  className={
                    point.isCompleted ? "line-through text-gray-500" : ""
                  }
                >
                  {point.content}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
        <span>Category: {resolution?.category}</span>
        <span>
          Created:{" "}
          {resolution?.createdAt
            ? new Date(resolution.createdAt).toLocaleDateString()
            : "N/A"}
        </span>
      </div>
      {!userId && (
        <Popup message="login now and start creating your Resolutions With help of AI" />
      )}
    </div>
  );
}
