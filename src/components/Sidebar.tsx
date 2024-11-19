"use client";

import { Resolution } from "@/types/resolution";
import { useAuth, UserButton } from "@clerk/nextjs";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const { userId } = useAuth();
  const [userResolutions, setUserResolutions] = useState<Resolution[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchUserResolutions = async () => {
      try {
        const response = await axios.get("/api/my");
        setUserResolutions(response.data);
      } catch (error) {
        console.error("Error fetching resolutions:", error);
      }
    };

    fetchUserResolutions();
  }, [userId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-800">Resolution hub</h2>
      </div>
      <div className="p-3 space-y-2">
        {userResolutions.map((resolution) => (
          <Link
            key={resolution.id}
            href={`/dashboard/resolutions/${resolution.id}`}
            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 overflow-y-auto">
              <h3 className="font-medium text-gray-900 line-clamp-1">
                {resolution.title}
              </h3>
              <div className="flex items-center text-xs text-gray-500 space-x-2">
                <span>{resolution.points.length} points</span>
                <span>•</span>
                <span>{resolution.category}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-400 to-orange-300"
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
          </Link>
        ))}
        {userResolutions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No resolutions yet</p>
          </div>
        )}
      </div>
      <div className="shrink-0 p-4 border-t mt-auto flex items-center justify-between">
        <UserButton />
        <Link
          href="/dashboard"
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-6 h-6 text-gray-500" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
