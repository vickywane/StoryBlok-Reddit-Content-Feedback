import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function extractTextWithOpenAI(
  storyContent: any,
  apiKey: string
): Promise<any> {
  const openai = createOpenAI({
    apiKey: apiKey,
  });

  const { text } = await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: `
      You are a text extraction assistant. Extract all readable text content from the provided JSON structure and return it as plain text. Remove any formatting, HTML tags, or structural elements. Just return the pure text content.
      
      Extract the text content from this Storyblok story data: ${JSON.stringify(storyContent)}
    `,
    maxTokens: 2000,
    temperature: 0,
  });

  return text;
}
