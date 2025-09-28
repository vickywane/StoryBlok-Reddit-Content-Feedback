import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              StoryBlok Reddit Content Feedback
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A Storyblok tool plugin that delivers AI-powered content feedback,
              enriched with insights drawn from Reddit discussions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Why Reddit Insights?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Content editors often turn to Reddit discussions to gain
                  authentic insights into industry challenges, user pain points,
                  and product experiences. Our AI aggregates these conversations
                  to extract actionable insights like SEO keywords, emerging
                  trends, and sentiment analysis.
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• AI-powered content analysis</li>
                  <li>• Reddit discussion insights</li>
                  <li>• SEO keyword extraction</li>
                  <li>• Trend identification</li>
                  <li>• Sentiment analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Open Dashboard
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <div className="flex flex-col gap-2" >
              <div className="text-sm text-gray-500">
                Built for the{" "}
                <a
                  href="https://storyblok-code-coffee.devpost.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  Storyblok x Code and Coffee Hackathon 2025
                </a>
              </div>
              <div className="text-sm text-gray-500">
                View MVP source code on {" "}
                <a
                  href="https://github.com/vickywane/StoryBlok-Reddit-Content-Feedback"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
