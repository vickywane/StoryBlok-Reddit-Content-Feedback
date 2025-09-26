import { getAllStoriesFromAllPages } from "@/app/api/lib/storyblok";
import { useConfigStore } from "@/app/store/configStore";
import { useState, useEffect, useCallback } from "react";
import CustomSelect from "../Select";

const Index = () => {
  const {
    isCredentialsSaved,
    credentialsConfig,
    setCurrentStep,
    saveTargetStory,
  } = useConfigStore();

  const [stories, setStories] = useState<any[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState("");

  const storyOptions = stories.map((story) => ({
    value: story.id.toString(),
    label: `${story.name} (${story.slug || "no-slug"})`,
  }));

  const handleStorySelection = (input: string) => {
    saveTargetStory(input);
    setSelectedStory(input);
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Feedback</h2>
      <p className="text-gray-600 mb-6">Get feedback on your story.</p>

      {/* TODO: Handle cases where user has no Story on StoryBlok (stories.length > 0 &&) */}

      <div className="space-y-4">
        {/* <CustomSelect
          label="Suggest"
          id="story-select"
          placeholder={
            storiesLoading ? "Loading stories..." : "Choose a story..."
          }
          value={selectedStory}
          onValueChange={handleStorySelection}
          options={storyOptions}
        /> */}

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            {storiesLoading
              ? "Fetching stories..."
              : `${stories.length} stories available`}
          </span>
          {/* <button
            onClick={fetchStories}
            disabled={storiesLoading}
            className="text-blue-600 hover:text-blue-800 underline disabled:text-gray-400 disabled:no-underline"
          >
            {storiesLoading ? "Loading..." : "Refresh Stories"}
          </button> */}
        </div>

        {/* {selectedStory && (
          <div>
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

            <div className="w-full">
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
              >
                Generate Feedback
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Index;
