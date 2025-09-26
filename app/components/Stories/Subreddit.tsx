import { useConfigStore } from "../../store/configStore";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

export const Subreddit = () => {
  const {
    redditSuggestions,
    isLoadingSuggestions,
    suggestionsError,
    fetchRedditSuggestions,
    credentialsConfig,
    storyId,
    removeSuggestion,
    addSuggestion,
  } = useConfigStore();

  const [newSubreddit, setNewSubreddit] = useState("");

  useEffect(() => {
    if (credentialsConfig && storyId) {
      fetchRedditSuggestions();
    }
  }, [credentialsConfig, storyId, fetchRedditSuggestions]);

  const handleAddSubreddit = () => {
    if (newSubreddit.trim()) {
      addSuggestion(newSubreddit.trim());
      setNewSubreddit("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSubreddit();
    }
  };

  if (isLoadingSuggestions) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Reddit Suggestions
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">
            Fetching subreddit suggestions...
          </p>
        </div>
      </div>
    );
  }

  if (suggestionsError) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Reddit Suggestions
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {suggestionsError}</p>
          <button
            onClick={fetchRedditSuggestions}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Reddit Suggestions
      </h2>
      <p className="text-gray-600 mb-6">
        AI-generated subreddit suggestions for your story content.
      </p>

      {/* Add New Subreddit Input */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Add Custom Subreddit</h3>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 transform -y-1/2 text-gray-500 text-sm">r/</span>
            <input
              type="text"
              value={newSubreddit}
              onChange={(e) => setNewSubreddit(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter subreddit name"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            onClick={handleAddSubreddit}
            disabled={!newSubreddit.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition-colors flex items-center gap-1"
          >
            <AiOutlinePlus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {redditSuggestions.length > 0 ? (
        <div className="space-y-3">
          {redditSuggestions.map((suggestion, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-base text-blue-600">
                  {suggestion}
                </h3>
              </div>
              <button
                onClick={() => removeSuggestion(index)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                title="Remove subreddit"
              >
                <AiOutlineDelete className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No suggestions available yet.</p>
          <button
            onClick={fetchRedditSuggestions}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Generate Suggestions
          </button>
        </div>
      )}
    </div>
  );
};
