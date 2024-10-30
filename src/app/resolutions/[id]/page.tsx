'use client'
import Popup from '@/components/Popup';
import { db } from '@/lib/db';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import {
  CheckCircle2,
  Clock,
  LoaderIcon,
  Share,
  Share2,
  Trash,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { Resolution } from "../../../../types/resolution";

const ResolutionDetail = ({ params }: any) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [resolution, setResolution] = useState<Resolution | null>(null);

  useEffect(() => {
    const fetchResolution = async () => {
      try {
        const response = await axios.get(`/api/resolution/${params.id}  `);
        setResolution(response.data);
        console.log(response.data, "response.data");
        console.log(resolution, "resolution");
      } catch (error) {
        console.error("Error fetching resolution:", error);
      }
    };

    if (params.id) {
      fetchResolution();
    }
  }, [params.id, userId]);

  if (!resolution) {
    return (
      <div className="custom-h w-screen grid place-content-center">
        <LoaderIcon size={48} className=" text-blue-700 animate-spin" />
      </div>
    );
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://nyn.rajcrafts.tech/resolutions/${params.id}`
      );
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      const resolution = await axios.delete("/api/create", {
        data: {
          id: id,
          userId: userId,
        },
      });
      router.push("/resolutions");
      toast.success("Resolution deleted successfully");
    } catch (error: any) {
      console.error("Error deleting resolution:", error);
      toast.error("Error deleting resolution", error);
    }
  };

  const handleTogglePoint = async (resolutionId: string, pointId: string) => {
    try {
      const point = resolution.points.find((p) => p.id === pointId);

      if (!point) return;

      const response = await axios.put("/api/create", {
        id: resolutionId,
        userId,
        pointId,
        isCompleted: !point.isCompleted,
      });

      // Update local state
      setResolution((prev) =>
        prev
          ? {
              ...prev,
              points: prev.points.map((p) =>
                p.id === pointId ? { ...p, isCompleted: !p.isCompleted } : p
              ),
            }
          : null
      );

      toast.success("Progress updated!");
    } catch (error) {
      toast.error("Failed to update progress");
      console.error(error);
    }
  };

  const completedPoints = resolution.points.filter(
    (point) => point.isCompleted
  ).length;
  const progress = (completedPoints / resolution.points.length) * 100;
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-t-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {resolution.title}
              </h1>
              <p className="text-gray-500 mt-1">
                Created by {resolution.creatorName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {userId === resolution.userId && (
                <button
                  onClick={() => handleDelete(resolution.id)}
                  className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {completedPoints} of {resolution.points.length} completed
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
        </div>
        {/* Points List */}
        <div className="bg-white rounded-b-xl shadow-sm divide-y divide-gray-100">
          {resolution.points.map((point) => (
            <div
              key={point.id}
              className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => handleTogglePoint(resolution.id, point.id)}
                    className={`flex-shrink-0 transition-colors ${
                      point.isCompleted ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </button>
                  <span
                    className={`${
                      point.isCompleted
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {point.content}
                  </span>
                </div>
                {point.completedAt && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(point.completedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
          <span>Category: {resolution.category}</span>
          <span>
            Created: {new Date(resolution.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      {!userId && (
        <Popup message="login now and start creating your Resolutions With help of AI" />
      )}
    </div>
  );
};

export default ResolutionDetail;
