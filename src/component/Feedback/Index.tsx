import { useConfigStore } from "@/app/store/configStore";
import { useState, useEffect } from "react";

const Index = () => {
  const {
    isCredentialsSaved,
    fetchAnalysis,
    analysisData,
    isLoadingAnalysis,
    analysisError,
    createStoryblokDiscussion,
    isCreatingDiscussion,
    discussionError,
    setCurrentStep,
  } = useConfigStore();

  useEffect(() => {
    if (isCredentialsSaved) {
      fetchAnalysis();
    }
  }, [isCredentialsSaved, fetchAnalysis]);

  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = () => {
    createStoryblokDiscussion();
    setIsFeedbackSubmitted(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Feedback</h2>
      <p className="text-gray-600 mb-6">Get feedback on your story.</p>

      {/* Analysis Results */}
      {isLoadingAnalysis && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading analysis...</span>
        </div>
      )}

      {analysisError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <h3 className="text-red-800 font-medium">Analysis Error</h3>
          <p className="text-red-600">{analysisError}</p>
        </div>
      )}

      {discussionError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <h3 className="text-red-800 font-medium">Discussion Error</h3>
          <p className="text-red-600">{discussionError}</p>
        </div>
      )}

      {analysisData && !isLoadingAnalysis && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Analysis Results
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(analysisData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {isFeedbackSubmitted ? (
        <button
          onClick={() => setCurrentStep(2)}
          disabled={isCreatingDiscussion || !analysisData}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm py-2 px-4 rounded transition-colors"
        >
          Generate Feedback Again
        </button>
      ) : (
        <button
          onClick={handleFeedbackSubmit}
          disabled={isCreatingDiscussion || !analysisData}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm py-2 px-4 rounded transition-colors"
        >
          {isCreatingDiscussion
            ? "Adding Feedback..."
            : "Add Feedback To StoryBlok Story"}
        </button>
      )}
    </div>
  );
};

export default Index;
