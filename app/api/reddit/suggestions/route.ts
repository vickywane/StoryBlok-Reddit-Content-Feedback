import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { getStoryContent } from "../../lib/storyblok";
import { extractTextWithOpenAI } from "../../lib/openai";
import { z } from "zod";

export const dynamic = "force-dynamic";

// Define your Zod schema for structured output
const ResponseSchema = z.object({
  subreddits: z.array(z.object({
    name: z.string(),
    summary: z.string(),
  })),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const spaceId = searchParams.get("spaceId");
    const storyId = searchParams.get("storyId");
    const oauthToken = searchParams.get("oauthToken");
    const openaiApiKey = searchParams.get("openaiApiKey");

    if (!spaceId || !storyId || !oauthToken || !openaiApiKey) {
      return Response.json({
        status: 400,
        message:
          "Missing required query parameters: spaceId, storyId, oauthToken, openaiApiKey",
      });
    }

    const storyContent = await getStoryContent(spaceId, storyId, oauthToken);

    const extractedData = await extractTextWithOpenAI(
      storyContent,
      openaiApiKey
    );

    const openai = createOpenAI({
      apiKey: openaiApiKey,
    });

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: ResponseSchema,
      prompt: `
        You are an experienced reddit user. 
        Your task is to suggest 5 relevant subreddits where the content of the following article would be a good fit. 
        Text: ${extractedData}

        For each subreddit, provide the name (with r/ prefix) and a brief summary (max 40 characters) explaining why it's relevant.
      `,
    });

    console.log("REDDIT SUGGESTIONS =>", object);

    return Response.json({ data: object });
  } catch (error) {
    console.error("Failed to fetch posts:", error);

    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
