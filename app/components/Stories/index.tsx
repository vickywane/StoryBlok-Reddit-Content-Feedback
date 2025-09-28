import { getAllStoriesFromAllPages } from "@/app/api/lib/storyblok";
import { useConfigStore } from "@/app/store/configStore";
import { useState, useEffect, useCallback } from "react";
import CustomSelect from "../Select";
import { Subreddit } from "./Subreddit";

const Index = () => {
  const {
    isCredentialsSaved,
    credentialsConfig,
    saveTargetStory,
    redditSuggestions,
    setCurrentStep,
  } = useConfigStore();

  const [stories, setStories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState("");

  const fetchStories = useCallback(async () => {
    if (!credentialsConfig?.storyBlokToken) {
      console.log("No Storyblok token available");
      return;
    }

    setStoriesLoading(true);
    try {
      const allStories = await getAllStoriesFromAllPages(
        credentialsConfig?.storyBlokToken
      );
      setStories(allStories);
    } catch (error) {
      console.error("❌ Failed to fetch stories:", error);
      setStories([]);
    } finally {
      setStoriesLoading(false);
    }
  }, [credentialsConfig?.storyBlokToken]);

  useEffect(() => {
    if (isCredentialsSaved && credentialsConfig?.storyBlokToken) {
      fetchStories();
    }
  }, [isCredentialsSaved, credentialsConfig?.storyBlokToken, fetchStories]);

  const storyOptions = stories.map((story) => ({
    value: story.id.toString(),
    label: `${story.name} (${story.slug || "no-slug"})`,
  }));

  const handleStorySelection = (input: string) => {
    saveTargetStory(input);
    setSelectedStory(input);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Storyblok Stories
      </h2>
      <p className="text-gray-600 mb-6">
        Select a story from your Storyblok space for analysis.
      </p>

      {/* TODO: Handle cases where user has no Story on StoryBlok (stories.length > 0 &&) */}

      <div className="space-y-4">
        <CustomSelect
          label="Select Story"
          id="story-select"
          placeholder={
            storiesLoading ? "Loading stories..." : "Choose a story..."
          }
          value={selectedStory}
          onValueChange={handleStorySelection}
          options={storyOptions}
        />

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            {storiesLoading
              ? "Fetching stories..."
              : `${stories.length} stories available`}
          </span>
          <button
            onClick={fetchStories}
            disabled={storiesLoading}
            className="text-blue-600 hover:text-blue-800 underline disabled:text-gray-400 disabled:no-underline"
          >
            {storiesLoading ? "Loading..." : "Refresh Stories"}
          </button>
        </div>

        {selectedStory && (
          <div className="grid gap-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <p className="text-blue-800 text-sm truncate">
                  <b>Story:</b>{" "}
                  {
                    storyOptions.find(
                      (option) => option.value === selectedStory
                    )?.label
                  }
                </p>
              </div>
            </div>

            <Subreddit />

            {redditSuggestions.length && (
              <div className="w-full">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                >
                  Generate Feedback
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
