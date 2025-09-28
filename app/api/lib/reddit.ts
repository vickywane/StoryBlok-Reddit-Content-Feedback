import snoowrap from "snoowrap";
import { filterCommentData } from "./filters";

interface RedditPost {
  title: string;
  author: string;
  score: number;
  url: string;
  created_utc: number;
  num_comments: number;
  id: string;
  subreddit: string;
  permalink: string;
}

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

interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

export async function getSubredditPosts(
  subreddit: string,
  limit: number = 100
): Promise<RedditPost[]> {
  try {
    const response = await fetch(
      `https://www.reddit.com/${subreddit}/hot.json?limit=${limit}`,
      {
        headers: {
          "User-Agent": "my-app:v1.0.0 (by u/key_Tumbleweed8899)",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RedditResponse = await response.json();

    return data.data.children.map((child) => child.data);
    // return transformPosts(data.data.children);
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
    throw error;
  }
}

// TODO: review the ETL of data from reddit comments here. Might be loosing some data
export async function getPostComments(
  postId: string
): Promise<RedditComment[]> {
  try {
    if (
      !process.env.REDDIT_CLIENT_ID ||
      !process.env.REDDIT_CLIENT_SECRET ||
      !process.env.REDDIT_REFRESH_TOKEN ||
      !process.env.USER_AGENT
    ) {
      throw new Error("Missing Reddit API credentials");
    }

    const reddit = new snoowrap({
      userAgent: process.env.USER_AGENT,
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      refreshToken: process.env.REDDIT_REFRESH_TOKEN,
    });

    // @ts-expect-error fetch posts
    const post = await reddit
      .getSubmission(postId)
      .expandReplies({ limit: Infinity, depth: Infinity });

    if (!post.id) {
      console.log("No post found for ID:", postId);
      return [];
    }

    const comments = filterCommentData(post.comments, [
      "body",
      "subreddit",
      "body_html",
      "permalink",
      "subreddit_name_prefixed",
      "parent_id",
    ]);

    return comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
}
