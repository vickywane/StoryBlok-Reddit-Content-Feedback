"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import Page from "./Page";
import Teaser from "./Teaser";
import Hero from "./Hero";
import BlogGrid from "./BlogGrid";
import Newsletter from "./Newsletter";

const components = {
  page: Page,
  teaser: Teaser,
  hero: Hero,
  blog_grid: BlogGrid,
  newsletter: Newsletter,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: 'eu',  
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}