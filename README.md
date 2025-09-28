# StoryBlok Reddit Content Feedback

> An AI-powered tool for content feedback enriched with insights from Reddit discussions. Analyses discussions in subreddits to extract SEO keywords,  emerging trends, and sentiment useful for impact.

## Inspiration 

> This project is currently being built during the (Storyblok x Code and Coffee Hackathon 2025)[https://storyblok-code-coffee.devpost.com/] event.

While working with content editors, I’ve observed that they often turn to Reddit discussions to gain authentic insights into industry challenges, user pain points, and product experiences. Conversational AI models can play a valuable role here by aggregating large volumes of discussions and analyzing them to extract actionable insights such as SEO keywords, emerging trends, and sentiment.

## User flow

- Configure StoryBlok and OpenAI credentials.
- Read a StoryBlok story 
- Extract plain text from the story object and recommend relevant subbreddits to post the story or get usefull insights.
- Sentiment analysis against the story based on crawled description from the relevant subbreddits.
- Create a discussion and comment within the story.

<img alt="user flow" style="height: auto; width: 100%; object-fit: contain;" src="./public/flow.png" />

## Technologies
- StoryBlok CMS Editor
- StoryBlok Management API
- OpenAI 
- React / Next.js / Next.js Route Handlers for edge functions. 
- Vercel AI 
- Reddit

## Screenshots

## Todo

- [ ] Implement user authentication. 
- [ ] Support persisting of application credentials based on user preference.
- [ ] Introduce sufficient E2E and Unit tests. 
- [ ] Build simple landing page or write blog post detailing the tool features. 

## Contributing
Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.

## How can I thank you?
Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or HackerNews? Spread the word!

Don't forget to follow and connect with me on [Twitter](https://x.com/iamnwani) and [Linkedln](https://www.linkedin.com/in/victory-nwani/)!