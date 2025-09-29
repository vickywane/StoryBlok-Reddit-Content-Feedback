import { storyblokEditable } from "@storyblok/react/rsc";

const Newsletter = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        {blok.title && (
          <h2 className="text-4xl font-bold text-white mb-4">{blok.title}</h2>
        )}

        {/* Description */}
        {blok.description && (
          <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            {blok.description}
          </p>
        )}

        {/* Newsletter Form */}
        <form className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder={blok.placeholder || "Enter your email"}
              className="flex-1 px-6 py-4 rounded-lg border-0 focus:ring-4 focus:ring-white focus:ring-opacity-30 outline-none text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {blok.button_text || "Subscribe"}
            </button>
          </div>
        </form>

        {/* Privacy Notice */}
        {blok.privacy_text && (
          <p className="text-sm text-white text-opacity-70 mt-4 max-w-2xl mx-auto">
            {blok.privacy_text}
          </p>
        )}

        {/* Features */}
        {blok.features && blok.features.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {blok.features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center text-white text-opacity-90">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;