import OpenAI from "openai";
import { getStoryContent } from "../lib/storyblok";
import fs from "fs/promises";
import path from "path";
import { extractTextWithOpenAI } from "../lib/openai";

export const dynamic = "force-static";

interface RedditComment {
  author: string;
  body: string;
  score: number;
  created_utc: number;
  id: string;
  replies?: RedditCommentsResponse;
}

interface RedditCommentsResponse {
  data: {
    children: Array<{
      kind: string;
      data: RedditComment;
    }>;
  };
}

async function readBasketballData() {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/api/reddit/r_basketball.json"
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading r_basketball.json:", error);
    return null;
  }
}

export async function GET() {
  const query = "n8n";

  try {
    const basketballData = await readBasketballData();

    const spaceId = "287220050008700";
    const storyId = "94731714972035";
    const oauthToken = "eQgNwEG96UboNj2BR5Aamwtt-114622-sz4X4ZJSNrxBf7A63mYz";
    const openaiApiKey =
      "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";
    const blockUid = "178a5945-20ae-48ae-a9ec-cf25ebc8138a";

    const storyContent = await getStoryContent(spaceId, storyId, oauthToken);

    // story content in plain text
    const extractedData = await extractTextWithOpenAI(
      storyContent,
      openaiApiKey
    );

    // const posts = await getSubredditPosts(query);

    // if (!posts.length) {
    //   console.log(`No posts found in r/${query}`);
    //   return Response.json({ status: 404, message: "No posts found" });
    // }

    // const transformed = transformPosts(posts);

    // const insertedComments = await Promise.all(
    //   transformed.map(async (post) => ({
    //     ...post,
    //     comments: await getPostComments(query, post.id, 2),
    //   }))
    // );

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    // console.log("STORY CONTENT =>", basketballData);

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_file",
              filename: "input.json",
              file_data: `data:application/json;base64,${basketballData}`,
            },
            {
              type: "input_text",
              text: `Analyze ${storyContent} and identify critical data points that are missing and perform a sentiment analysis on the text content against your raw input data.`,
            },
          ],
        },
        // {
        //   role: "user",
        //   content: [
        //     {
        //       type: "input_text",
        //       text: `Analyze ${storyContent} and identify critical data points that are missing and perform a sentiment analysis on the text content against your raw input data.`,
        //     },
        //   ],
        // },
      ],
    });

    console.log("RESPONSE =>", response);

    // return await saveToJsonFile(insertedComments, `r_${query}.json`);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return Response.json({ data: null });
}
