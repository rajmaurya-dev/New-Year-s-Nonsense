"use client";

import { useResolutions } from "@/lib/queries";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useAuth();
  const { data: userResolutions } = useResolutions(userId!);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 p-2 bg-white rounded-lg shadow-md md:hidden z-40"
      >
        <Menu className="w-6 h-6" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300 transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="font-semibold text-gray-800">Resolution hub</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:block p-4 border-b">
          <h2 className="font-semibold text-gray-800">Resolution hub</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {userResolutions?.map((resolution) => (
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
          {userResolutions?.length === 0 && (
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
    </>
  );
};

export default Sidebar;
