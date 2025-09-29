import { storyblokEditable } from "@storyblok/react/rsc";

const Hero = ({ blok }) => {
  const backgroundStyle = blok.background_image?.filename
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${blok.background_image.filename})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <section 
      {...storyblokEditable(blok)} 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white"
      style={backgroundStyle}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Main Title */}
        {blok.title && (
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            {blok.title}
          </h1>
        )}

        {/* Subtitle */}
        {blok.subtitle && (
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            {blok.subtitle}
          </p>
        )}

        {/* Description */}
        {blok.description && (
          <p className="text-lg mb-10 opacity-80 max-w-3xl mx-auto">
            {blok.description}
          </p>
        )}

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {blok.button_text && (
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              {blok.button_text}
            </button>
          )}
          
          {blok.secondary_button_text && (
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
              {blok.secondary_button_text}
            </button>
          )}
        </div>

        {/* Features or highlights */}
        {blok.features && blok.features.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {blok.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon || "✨"}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;