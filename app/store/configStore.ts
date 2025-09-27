import { create } from "zustand";
import toast from "react-hot-toast";

// TODO: Implement conditional persistence based on user preferences

export interface Config {
  storyBlokToken: string;
  openaiApiKey: string;
  storyBlokSpaceId: string;
}

export interface RedditSuggestion {
  subreddit: string;
  reason: string;
}

interface ConfigState {
  credentialsConfig: Config | null;
  isCredentialsSaved: boolean;
  currentStep: number;
  storyId: null | string;
  redditSuggestions: string[];
  isLoadingSuggestions: boolean;
  suggestionsError: string | null;
  analysisData: any;
  plainStory: string;
  isLoadingAnalysis: boolean;
  analysisError: string | null;
  isCreatingDiscussion: boolean;
  discussionError: string | null;

  saveCredentialsConfig: (config: Config) => void;
  clearCredentialsConfig: () => void;
  setCurrentStep: (step: number) => void;
  saveTargetStory: (storyId: string) => void;
  fetchRedditSuggestions: () => Promise<void>;
  fetchAnalysis: () => Promise<void>;
  clearSuggestions: () => void;
  removeSuggestion: (index: number) => void;
  addSuggestion: (subreddit: string) => void;
  createStoryblokDiscussion: () => Promise<void>;
}

export const useConfigStore = create<ConfigState>()((set, get) => ({
  redditSuggestions: ["r/basketball"],
  isLoadingSuggestions: false,
  suggestionsError: null,
  analysisData: null,
  isLoadingAnalysis: false,
  analysisError: null,
  isCreatingDiscussion: false,
  discussionError: null,

  isCredentialsSaved: true,

  currentStep: 1,
  credentialsConfig: null,
  storyId: null,
  plainStory: "",

  setCurrentStep: (step: number) => {
    return set({ currentStep: step });
  },

  saveCredentialsConfig: (config: Config) => {
    return set({
      credentialsConfig: config,
      isCredentialsSaved: true,
    });
  },

  saveTargetStory: (storyId: string) => {
    return set({ storyId });
  },

  clearCredentialsConfig: () => {
    return set({
      credentialsConfig: null,
      isCredentialsSaved: false,
    });
  },

  fetchRedditSuggestions: async () => {
    const state = get();
    const { credentialsConfig, storyId } = state;

    if (!credentialsConfig || !storyId) {
      set({ suggestionsError: "Missing credentials or story ID" });
      return;
    }

    const { storyBlokToken, openaiApiKey, storyBlokSpaceId } =
      credentialsConfig;

    set({ isLoadingSuggestions: true, suggestionsError: null });

    try {
      const params = new URLSearchParams({
        spaceId: storyBlokSpaceId,
        storyId: storyId,
        oauthToken: storyBlokToken,
        openaiApiKey: openaiApiKey,
      });

      const response = await fetch(
        `/api/reddit/suggestions?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      const suggestions =
        data.subreddits?.map(
          (sub: { name: string; summary: string }) => sub.name
        ) || [];

      set({
        redditSuggestions: suggestions,
        isLoadingSuggestions: false,
        suggestionsError: null,
        plainStory: data.plain_text || "",
      });

      toast.success(`Found ${suggestions.length} Reddit suggestions!`);
    } catch (error) {
      console.error("Failed to fetch Reddit suggestions:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to fetch suggestions";
      
      set({
        isLoadingSuggestions: false,
        suggestionsError: errorMessage,
      });

      toast.error(`Failed to fetch suggestions: ${errorMessage}`);
    }
  },

  fetchAnalysis: async () => {
    const state = get();
    const { credentialsConfig, storyId, redditSuggestions, plainStory } = state;

    if (!credentialsConfig || !storyId) {
      set({ analysisError: "Missing credentials or story ID" });
      return;
    }

    const { openaiApiKey } = credentialsConfig;

    set({ isLoadingAnalysis: true, analysisError: null });

    try {
      const params = new URLSearchParams({
        extractedContent: plainStory,
        openaiApiKey,
        subreddit: redditSuggestions[0],
      });

      const response = await fetch(`/api/reddit/analysis?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      set({
        analysisData: data,
        isLoadingAnalysis: false,
        analysisError: null,
      });

      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch analysis";
      
      set({
        isLoadingAnalysis: false,
        analysisError: errorMessage,
      });

      toast.error(`Analysis failed: ${errorMessage}`);
    }
  },

  clearSuggestions: () => {
    set({
      redditSuggestions: [],
      suggestionsError: null,
    });
  },

  removeSuggestion: (index: number) => {
    const state = get();
    const updatedSuggestions = state.redditSuggestions.filter(
      (_, i) => i !== index
    );
    set({ redditSuggestions: updatedSuggestions });
  },

  addSuggestion: (subreddit: string) => {
    const state = get();
    const cleanSubreddit = subreddit.replace(/^r\//, "").trim(); // Remove r/ prefix if present
    if (cleanSubreddit && !state.redditSuggestions.includes(cleanSubreddit)) {
      set({ redditSuggestions: [...state.redditSuggestions, cleanSubreddit] });
    }
  },

  createStoryblokDiscussion: async () => {
    const state = get();
    const { credentialsConfig, storyId, analysisData } = state;

    if (!credentialsConfig || !storyId) {
      set({ discussionError: "Missing credentials or story ID" });
      return;
    }

    if (!analysisData) {
      set({ discussionError: "No analysis data available" });
      return;
    }

    const { storyBlokToken, storyBlokSpaceId } = credentialsConfig;

    set({ isCreatingDiscussion: true, discussionError: null });

    try {
      const params = new URLSearchParams({
        spaceId: storyBlokSpaceId,
        storyId: storyId,
        oauthToken: storyBlokToken,
        action: "discussion",
      });

      const response = await fetch(`/api/storyblok?${params.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Automated Feedback Analysis",
          message: JSON.stringify(analysisData, null, 2),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      set({
        isCreatingDiscussion: false,
        discussionError: null,
      });

      toast.success("Feedback successfully added to Storyblok story!");
    } catch (error) {
      console.error("Failed to create Storyblok discussion:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to create discussion";
      
      set({
        isCreatingDiscussion: false,
        discussionError: errorMessage,
      });

      toast.error(`Failed to add feedback: ${errorMessage}`);
    }
  },
}));
