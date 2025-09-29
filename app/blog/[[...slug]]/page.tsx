import { StoryblokStory } from '@storyblok/react/rsc'
import { getStoryblokApi } from '@/src/lib/storyblok'
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()

  // TODO: Replace with dynamic slug handling
  const { data } = await getStoryblokApi().get('cdn/stories/blog/the-comeback-game-for-marcus', {
    version: isEnabled ? 'draft' : 'published',
  })

  return <StoryblokStory story={data.story} />
}
