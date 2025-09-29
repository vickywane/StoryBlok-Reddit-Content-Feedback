import { storyblokEditable, StoryblokStory } from "@storyblok/react/rsc";

const Page = ({ blok }) => {
  return (
    <main {...storyblokEditable(blok)} className="min-h-screen">
      {/* Page Header */}
      {blok.title && (
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">{blok.title}</h1>
            {blok.subtitle && (
              <p className="text-xl opacity-90">{blok.subtitle}</p>
            )}
          </div>
        </header>
      )}

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {blok.content && (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blok.content }}
          />
        )}

        {/* Nested Components */}
        {blok.body?.map((nestedBlok) => (
          <StoryblokStory blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </main>
  );
};

export default Page;