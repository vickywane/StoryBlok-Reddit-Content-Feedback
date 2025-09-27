import {
  createDiscussion,
  createComment,
  getStoryContent,
} from "../lib/storyblok";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const spaceId = searchParams.get("spaceId");
    const storyId = searchParams.get("storyId");
    const oauthToken = searchParams.get("oauthToken");
    const action = searchParams.get("action");

    if (!spaceId || !storyId || !oauthToken || !action) {
      return Response.json({
        status: 400,
        message:
          "Missing required query parameters: spaceId, storyId, oauthToken, action",
      });
    }

    const body = await request.json();

    const { subject, message } = body;

    if (!subject || !message) {
      return Response.json({
        status: 400,
        message: "Missing required fields: subject, message",
      });
    }

    const { story } = await getStoryContent(spaceId, storyId, oauthToken);

    // console.log("Fetched story:", story.content._uid);

    const discussion = await createDiscussion({
      spaceId,
      storyId,
      oauthToken,
      subject,
      message,
      blockId: story.content._uid,
    });

    return Response.json({ data: discussion });
  } catch (error) {
    console.error("Failed to process storyblok request:", error);

    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
