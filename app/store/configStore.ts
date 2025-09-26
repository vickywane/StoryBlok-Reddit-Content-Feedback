import { create } from "zustand";

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

  saveCredentialsConfig: (config: Config) => void;
  clearCredentialsConfig: () => void;
  setCurrentStep: (step: number) => void;
  saveTargetStory: (storyId: string) => void;
  fetchRedditSuggestions: () => Promise<void>;
  clearSuggestions: () => void;
  removeSuggestion: (index: number) => void;
  addSuggestion: (subreddit: string) => void;
}

export const useConfigStore = create<ConfigState>()((set, get) => ({
  credentialsConfig: null,
  storyId: null,
  currentStep: 1,
  redditSuggestions: [],
  isLoadingSuggestions: false,
  suggestionsError: null,

  isCredentialsSaved: false,

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

    const { storyBlokToken, openaiApiKey, storyBlokSpaceId } = credentialsConfig;

    set({ isLoadingSuggestions: true, suggestionsError: null });

    try {
      const params = new URLSearchParams({
        spaceId: storyBlokSpaceId,
        storyId: storyId,
        oauthToken: storyBlokToken,
        openaiApiKey: openaiApiKey,
      });

      const response = await fetch(`/api/reddit/suggestions?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      
      // Extract subreddit names from the response
      const suggestions = data.subreddits?.map((sub: { name: string; summary: string }) => sub.name) || [];
      console.log("Fetched Reddit Suggestions:", suggestions);
      
      set({ 
        redditSuggestions: suggestions,
        isLoadingSuggestions: false,
        suggestionsError: null 
      });
    } catch (error) {
      console.error("Failed to fetch Reddit suggestions:", error);
      set({ 
        isLoadingSuggestions: false, 
        suggestionsError: error instanceof Error ? error.message : "Failed to fetch suggestions"
      });
    }
  },

  clearSuggestions: () => {
    set({ 
      redditSuggestions: [], 
      suggestionsError: null 
    });
  },

  removeSuggestion: (index: number) => {
    const state = get();
    const updatedSuggestions = state.redditSuggestions.filter((_, i) => i !== index);
    set({ redditSuggestions: updatedSuggestions });
  },

  addSuggestion: (subreddit: string) => {
    const state = get();
    const cleanSubreddit = subreddit.replace(/^r\//, '').trim(); // Remove r/ prefix if present
    if (cleanSubreddit && !state.redditSuggestions.includes(cleanSubreddit)) {
      set({ redditSuggestions: [...state.redditSuggestions, cleanSubreddit] });
    }
  },
}));
