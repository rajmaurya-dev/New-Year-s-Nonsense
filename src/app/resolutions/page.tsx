'use client'
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import {
  ArrowBigRightDash,
  ArrowRightCircle,
  CheckCircle2,
  Clock,
  Delete,
  DoorOpen,
  LoaderIcon,
  Share,
  Share2,
  Trash,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { Resolution } from "../../../types/resolution";
import { useRouter } from "next/navigation";

const MyResolutions = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const router = useRouter();
  const fetchResolutions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/my");
      console.log(response.data);
      setResolutions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resolutions:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchResolutions();
  }, [userId]);
  const copyToClipboard = async (id: string) => {
    try {
      await navigator.clipboard.writeText(
        `https://nyn.rajcrafts.tech/resolutions/${id}`
      );

      toast.success("Link Copied to clipboard!");
    } catch (err: any) {
      toast.error("Failed to copy Link: ", err);
      console.error("Failed to copy Link: ", err);
    }
  };

  if (loading) {
    return (
      <div className="custom-h w-screen grid place-content-center">
        <LoaderIcon size={48} className=" text-blue-700 animate-spin" />
      </div>
    );
  }
  const handleDelete = async (id: any) => {
    try {
      const resolution = await axios.delete("/api/create", {
        data: {
          id: id,
          userId: userId,
        },
      });
      setResolutions((prevResolutions) =>
        prevResolutions.filter((resolution) => resolution.id !== id)
      );
      toast.success("Resolution deleted successfully");
    } catch (error: any) {
      console.error("Error deleting resolution:", error);
      toast.error("Error deleting resolution", error);
    }
  };
  const handleTogglePoint = async (resolutionId: string, pointId: string) => {
    try {
      const point = resolutions
        .find((r) => r.id === resolutionId)
        ?.points.find((p) => p.id === pointId);

      if (!point) return;

      const response = await axios.put("/api/create", {
        id: resolutionId,
        userId,
        pointId,
        isCompleted: !point.isCompleted,
      });

      // Update local state
      setResolutions((prev) =>
        prev.map((resolution) => {
          if (resolution.id === resolutionId) {
            return {
              ...resolution,
              points: resolution.points.map((p) =>
                p.id === pointId ? { ...p, isCompleted: !p.isCompleted } : p
              ),
            };
          }
          return resolution;
        })
      );

      toast.success("Progress updated!");
    } catch (error) {
      toast.error("Failed to update progress");
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg-gray-50">
      {resolutions.map((resolution) => (
        <div
          key={resolution.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow"
        >
          {/* Card Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
                {resolution.title}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(resolution.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-full"
                >
                  <Share2 className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDelete(resolution.id)}
                  className="p-1.5 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-orange-300 transition-all duration-500"
                style={{
                  width: `${
                    (resolution.points.filter((p) => p.isCompleted).length /
                      resolution.points.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Preview Points */}
          <div className="p-6">
            <div className="space-y-3 mb-4">
              {resolution.points.slice(0, 3).map((point) => (
                <div key={point.id} className="flex items-center gap-2">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      point.isCompleted ? "text-green-500" : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      point.isCompleted
                        ? "text-gray-500 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {point.content}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push(`/resolutions/${resolution.id}`)}
                className="text-rose-500 hover:text-rose-600 text-sm font-medium"
              >
                View Details
              </button>
              <span className="text-xs text-gray-500">
                {resolution.points.length} points
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyResolutions