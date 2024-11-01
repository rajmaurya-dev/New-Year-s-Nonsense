import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};
export async function POST(request: NextRequest) {
  const { prompt, goal } = await request.json();

console.log(prompt, "prompt");
console.log(goal, "goal");

if (goal === "realistic") {
  const parts = [
    {
      text: `i want ${prompt}. Make resolutions for the New Year. Keep the goals short and easy to understand. give 10 resolutions. no big sentences. . using this json schema: 
        
Resolutions = {'resolutionName': string}
Return: Array<Recipe>
        `,
    },
  ];
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  const response = result.response;
  const aiResponse = response.text();
  return NextResponse.json(aiResponse);
}
if (goal === "unrealistic") {
  const parts = [
    {
      text: `i want ${prompt}. .Make resolutions that seem impossible and funny for the New Year. Keep the goals short and easy to understand.  give 10 resolutions. no big sentences. using this json schema: 
        
Resolutions = {'resolutionName': string}
Return: Array<Recipe> `,
    },
  ];
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  const response = result.response;
  const aiResponse = response.text();
  console.log(aiResponse);
  return NextResponse.json(aiResponse);
}
}
