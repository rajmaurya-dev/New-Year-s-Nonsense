'use client'
import Markdown from 'react-markdown'
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";

import { useAuth, useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

import { LoaderIcon, Pencil, RefreshCcw, Wand } from "lucide-react";
import { Resolution } from "../../../types/resolution";
import Link from "next/link";
interface FormData {
  about: string;
  goal: string;
}
interface AiResponse {
  resolutionName: string;
  isEditing?: boolean;
}
const Create = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [aiData, setAiData] = useState<AiResponse[]>([]);
  const { userId } = useAuth();
  const { user } = useUser();
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      goal: "realistic",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setIsGenerating(true);
      const response = await axios.post("/api/ai/realistic", {
        prompt: data.about,
        goal: data.goal,
      });
      toast.success("Resolution generated successfully");
      const cleanJsonString = response.data
        .replace(/```json\n/, "")
        .replace(/\n```$/, "");

      const parsedData = JSON.parse(cleanJsonString);
      setAiData(parsedData);
      console.log(aiData, "aiData");
      console.log(response.data, "res");
      setLoading(false);
      setIsGenerating(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error generating resolution");
      console.error(error);
      setIsGenerating(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const resolution = await axios.post("/api/create", {
        title: "My Resolutions for 2024",
        userId: userId,
        creatorName: user?.firstName,
        points: aiData?.map((item: AiResponse) => ({
          content: item.resolutionName,
          isCompleted: false,
        })),
        category: "personal",
        isCompleted: false,
      });
      setLoading(false);
      toast.success("Resolution created successfully");
      setAiData([]);
    } catch (error: any) {
      setLoading(false);
      setAiData([]);
      console.error("Error creating resolution:", error);
      toast.error("Error creating resolution", error);
    }
  };
  const handleEdit = (index: number) => {
    const newData = [...aiData];
    newData[index].isEditing = true;
    setAiData(newData);
  };

  const handleSave = (index: number, newContent: string) => {
    if (!newContent.trim()) return;
    const newData = [...aiData];
    newData[index].resolutionName = newContent;
    newData[index].isEditing = false;
    setAiData(newData);
  };
  const [userResolutions, setUserResolutions] = useState<Resolution[]>([]);

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
  return (
    <div className="h-[95vh] bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto hidden md:block">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-800">Your Resolutions</h2>
        </div>
        <div className="p-3 space-y-2">
          {userResolutions.map((resolution) => (
            <Link
              key={resolution.id}
              href={`/resolutions/${resolution.id}`}
              className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="space-y-1">
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
      </div>
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">
                Create Your 2024 Resolutions
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What do you want to improve this year?
                    </label>
                    <textarea
                      {...register("about")}
                      className="w-full h-32 rounded-lg border border-gray-200 p-4 text-gray-700 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Set Your Goal Type:
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          {...register("goal")}
                          type="radio"
                          id="realistic"
                          value="realistic"
                          className="peer hidden"
                        />
                        <label
                          htmlFor="realistic"
                          className="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-green-500 peer-checked:bg-green-50 hover:bg-gray-50"
                        >
                          Realistic
                        </label>
                      </div>
                      <div className="flex-1">
                        <input
                          {...register("goal")}
                          type="radio"
                          id="unrealistic"
                          value="unrealistic"
                          className="peer hidden"
                        />
                        <label
                          htmlFor="unrealistic"
                          className="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-rose-500 peer-checked:bg-rose-50 hover:bg-gray-50"
                        >
                          Unrealistic
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-orange-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      <>
                        <Wand className="w-5 h-5" />
                        <span>Generate Resolutions</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            {/* Right Column - Results */}
            <div className="">
              {isGenerating ? (
                <div className="animate-pulse">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg" />
                    <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                  </div>

                  <div className="space-y-3 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="h-12 bg-gray-200 rounded-lg w-full" />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <div className="h-12 bg-gray-200 rounded-lg flex-1" />
                    <div className="h-12 w-24 bg-gray-200 rounded-lg" />
                  </div>
                </div>
              ) : (
                <div
                  className={`bg-white rounded-2xl shadow-sm p-6 transition-all ${
                    aiData.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {aiData.length > 0 && (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                          Your 2024 Resolutions
                        </h2>
                        <div className="flex gap-2">
                          <button
                            disabled={loading}
                            onClick={handleSubmit(onSubmit)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                          >
                            {loading ? (
                              <LoaderIcon className="w-5 h-5 animate-spin" />
                            ) : (
                              <RefreshCcw size={20} className="text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {aiData.map((item, index) => (
                          <div
                            key={index}
                            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                          >
                            {item.isEditing ? (
                              <div className="flex gap-1">
                                <input
                                  type="text"
                                  defaultValue={item.resolutionName}
                                  className="flex-1 px-2 py-1 border rounded-md focus:border-transparent focus:outline-none text-sm"
                                  onBlur={(e) =>
                                    handleSave(index, e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleSave(index, e.currentTarget.value);
                                    }
                                  }}
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <p className="text-gray-700">
                                  {index + 1}. {item.resolutionName}
                                </p>
                                <button
                                  onClick={() => handleEdit(index)}
                                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                                >
                                  <Pencil size={14} className="text-gray-500" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={handleCreate}
                          disabled={loading}
                          className="flex-1 py-3 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <LoaderIcon className="animate-spin" />
                          ) : (
                            "Create Resolutions"
                          )}
                        </button>
                        <button
                          onClick={() => setAiData([])}
                          className="py-3 px-6 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create