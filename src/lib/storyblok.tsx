import {
  apiPlugin,
  storyblokInit,
  type StoryblokClient,
} from '@storyblok/react/rsc'
import { COMPONENTS } from '@/src/component'

export const getStoryblokApi: () => StoryblokClient = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: COMPONENTS,
})
