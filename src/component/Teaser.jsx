import { storyblokEditable } from "@storyblok/react/rsc";

const Teaser = ({ blok }) => {
  return (
    <article 
      {...storyblokEditable(blok)} 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
    >
      {/* Featured Image */}
      {blok.image?.filename && (
        <div className="relative overflow-hidden">
          <img
            src={blok.image.filename}
            alt={blok.image.alt || blok.headline}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {blok.category && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {blok.category}
            </span>
          )}
        </div>
      )}

      <div className="p-8">
        {/* Headline */}
        {blok.headline && (
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {blok.headline}
          </h2>
        )}

        {/* Description */}
        {blok.description && (
          <p className="text-gray-600 mb-6 leading-relaxed">
            {blok.description}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between mb-6">
          {/* Author & Date */}
          <div className="flex items-center space-x-4">
            {blok.author && (
              <div className="flex items-center space-x-2">
                {blok.author_image?.filename && (
                  <img
                    src={blok.author_image.filename}
                    alt={blok.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-gray-500">{blok.author}</span>
              </div>
            )}
            
            {blok.date && (
              <span className="text-sm text-gray-400">
                {new Date(blok.date).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Reading time */}
          {blok.reading_time && (
            <span className="text-sm text-gray-400">
              {blok.reading_time} min read
            </span>
          )}
        </div>

        {/* Tags */}
        {blok.tags && blok.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blok.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Call-to-Action */}
        {blok.link_text && (
          <div className="flex items-center justify-between">
            <a
              href={blok.link_url || "#"}
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
            >
              {blok.link_text}
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
            </a>

            {/* Social sharing or favorite button */}
            {blok.show_social && (
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default Teaser;