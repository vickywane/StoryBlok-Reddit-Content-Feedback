import { createOpenAI } from "@ai-sdk/openai";
import { generateText, stepCountIs, tool } from "ai";
import { z } from "zod";
import { getSubredditPosts } from "../../lib/reddit";
import { transformPosts } from "../../lib/transformers";

export const dynamic = "force-dynamic";

// const AnalysisSchema = z.object({
//   missing_data_points: z.array(z.string()),
//   sentiment_analysis: z.object({
//     overall_sentiment: z.enum(["positive", "negative", "neutral"]),
//     confidence_score: z.number().min(0).max(1),
//     key_themes: z.array(z.string()),
//     emotional_indicators: z.array(z.string()),
//   }),
//   recommendations: z.array(z.string()),
// });

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

    const openai = createOpenAI({
      apiKey: openaiApiKey,
    });

    const { text } = await generateText({
      model: openai("gpt-5-nano"),
      // schema: AnalysisSchema,
      system: `
        Get content from the following subreddit: ${subreddit} ( if r/ in name is missing, add it ) and try to find relevant data points from it when answering questions.
        Return a summary of your analysis using the tool result when done and limit to 200 words.
      `,
      prompt: `
        You are an expert data analyst and content researcher.
        
        Analyze the following story content and basketball data to:
        1. Identify critical data points that are missing from the story
        2. Perform sentiment analysis on the text content
        3. Provide recommendations based on your analysis in richtext format
        
        Story Content: ${extractedContent}
      `,
      stopWhen: stepCountIs(4),
      tools: {
        get_reddit_data: tool({
          type: "function",
          description: "Gets data from a specific subreddit.",
          inputSchema: z.object({
            subbredits: z.string(),
          }),
          execute: async ({ subbredits }) => {
            const posts = await getSubredditPosts(subbredits);

            if (!posts.length) {
              console.error(`No posts found in r/${subbredits}`);
              return;
            }

            const transformed = transformPosts(posts);

            return JSON.stringify({ transformed });
          },
        }),
      },
    });

    return Response.json({ data: text });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
