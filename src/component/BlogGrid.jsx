import { storyblokEditable, StoryblokStory } from "@storyblok/react/rsc";

const BlogGrid = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        {(blok.title || blok.subtitle) && (
          <div className="text-center mb-12">
            {blok.title && (
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{blok.title}</h2>
            )}
            {blok.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{blok.subtitle}</p>
            )}
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blok.posts?.map((post) => (
            <StoryblokStory blok={post} key={post._uid} />
          ))}
        </div>

        {/* Load More Button */}
        {blok.show_load_more && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;