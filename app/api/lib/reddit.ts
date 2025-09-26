import fs from "fs/promises";
import { transformArrayComments, transformComments } from "./transformers";
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

interface RedditData {
  subreddit: string;
  fetchedAt: string;
  posts: PostWithComments[];
}

// interface RedditResponse {
//   data: {
//     children: Array<{
//       data: RedditPost;
//     }>;
//   };
// }

// async function getSubredditPosts(
//   subreddit: string,
//   limit: number = 10
// ): Promise<RedditPost[]> {
//   try {
//     const response = await axios.get<RedditResponse>(
//       `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`,
//       {
//         headers: {
//           "User-Agent": "my-app:v1.0.0 (by u/key_Tumbleweed8899)",
//         },
//       }
//     );

//     return response.data.data.children.map((child) => child.data);
//   } catch (error) {
//     console.error("Error fetching Reddit posts:", error);
//     throw error;
//   }
// }

// async function getPostComments(
//   subreddit: string,
//   postId: string,
//   limit: number = 5
// ): Promise<RedditComment[]> {
//   try {
//     const { data: comments, status } = await axios.get<
//       [any, RedditCommentsResponse]
//     >(
//       `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=${limit}`,
//       {
//         headers: {
//           "User-Agent": "my-app:v1.0.0 (by u/key_Tumbleweed8899)",
//         },
//       }
//     );

//     // @ts-ignore
//     const transformedResponse = transformComments(comments.data.children);

//     return transformedResponse;
//   } catch (error) {
//     console.error(`Error fetching comments for post ${postId}:`, error);
//     return [];
//   }
// }

// async function saveToJsonFile(
//   data: RedditData,
//   filename: string
// ): Promise<void> {
//   try {
//     const jsonData = JSON.stringify(data, null, 2);
//     await fs.writeFile(filename, jsonData, "utf8");
//     console.log(`\nData saved to ${filename}`);
//   } catch (error) {
//     console.error("Error saving to JSON file:", error);
//   }
// }

interface RedditCommentsResponse {
  data: {
    children: Array<{
      kind: string;
      data: RedditComment;
    }>;
  };
}

interface PostWithComments {
  post: RedditPost;
  comments: RedditComment[];
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
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`,
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
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
    throw error;
  }
}

// TODO: review the ETL of data from reddit comments here. Might be loosing some data
export async function getPostComments(
  subreddit: string,
  postId: string,
  limit: number = 100
): Promise<RedditComment[]> {
  try {
    const reddit = new snoowrap({
      userAgent: "my-app:v1.0.0 (by u/key_Tumbleweed8899)",
      clientId: "GKwVq6piNPNsWM2IXsg4jA",
      clientSecret: "2sCVydRbQ4ot9y7yfQjaGg7zTSwNLA",
      refreshToken: "583673778351-JBGCn_BsQiKzofJWf3JrBy8lAenqnA",
    });

    // @ts-ignore
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

export async function saveToJsonFile(
  data: RedditData,
  filename: string
): Promise<void> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, jsonData, "utf8");
    console.log(`\nData saved to ${filename}`);
  } catch (error) {
    console.error("Error saving to JSON file:", error);
  }
}
