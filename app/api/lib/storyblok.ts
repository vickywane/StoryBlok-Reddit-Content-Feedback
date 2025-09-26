export async function getStoryContent(
  spaceId: string,
  storyId: string,
  oauthToken: string
): Promise<any> {
  const url = `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${storyId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: oauthToken,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get story content: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

export async function getAllStories(
  token: string,
  page: number = 1,
  perPage: number = 100,
  spaceId: string
): Promise<any> {
  const url = `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories`;

  const params = new URLSearchParams({
    version: "draft", // Use 'published' for production
    page: page.toString(),
    per_page: perPage.toString(),
    cv: Date.now().toString(), // Cache busting
  });

  const response = await fetch(`${url}?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch all stories: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}

export async function getAllStoriesFromAllPages(token: string): Promise<any[]> {
  let allStories: any[] = [];
  let page = 1;
  let hasMore = true;
  const perPage = 100; // Maximum per page

  while (hasMore) {
    try {
      const spaceId = "287220050008700";

      const response = await getAllStories(token, page, perPage, spaceId);

      if (response.stories && response.stories.length > 0) {
        allStories = allStories.concat(response.stories);

        // Check if there are more pages
        const totalStories = response.headers?.total || 0;
        const currentCount = page * perPage;
        hasMore =
          currentCount < totalStories && response.stories.length === perPage;

        page++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      hasMore = false;
    }
  }

  return allStories;
}
