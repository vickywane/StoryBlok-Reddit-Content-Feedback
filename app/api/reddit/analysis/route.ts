import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

export const dynamic = "force-dynamic";

const AnalysisSchema = z.object({
  missing_data_points: z.array(z.string()),
  sentiment_analysis: z.object({
    overall_sentiment: z.enum(["positive", "negative", "neutral"]),
    confidence_score: z.number().min(0).max(1),
    key_themes: z.array(z.string()),
    emotional_indicators: z.array(z.string()),
  }),
  recommendations: z.array(z.string()),
});

async function readBasketballData() {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/api/reddit/analysis/r_basketball.json"
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading r_basketball.json:", error);
    return null;
  }
}

// TODO: use openai tools to fetch content from reddit on-demand when the model needs it. 

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const extractedContent = searchParams.get("extractedContent");
    const openaiApiKey = searchParams.get("openaiApiKey");
    const subreddit = searchParams.get("subreddit");

    if (!extractedContent || !openaiApiKey || !subreddit) {
      return Response.json({
        status: 400,
        message:
          "Missing required query parameters: extractedContent, openaiApiKey, subreddit",
      });
    }

    const basketballData = await readBasketballData();

    const openai = createOpenAI({
      apiKey: openaiApiKey,
    });

    const { object } = await generateObject({
      model: openai("gpt-5-nano"),
      schema: AnalysisSchema,
      prompt: `
        You are an expert data analyst and content researcher.
        
        Analyze the following story content and basketball data to:
        1. Identify critical data points that are missing from the story
        2. Perform sentiment analysis on the text content
        3. Provide recommendations based on your analysis in richtext format
        
        Story Content: ${extractedContent}
        
        Provide a structured analysis with missing data points, sentiment analysis, and actionable recommendations.
      `,
    });

    return Response.json({ data: object });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
