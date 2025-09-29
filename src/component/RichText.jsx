import { storyblokEditable } from "@storyblok/react/rsc";

const RichText = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        {blok.content && (
          <div 
            className="prose prose-lg prose-blue max-w-none
              prose-headings:text-gray-900 
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4
              prose-img:rounded-lg prose-img:shadow-lg
              prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: blok.content }}
          />
        )}
      </div>
    </section>
  );
};

export default RichText;