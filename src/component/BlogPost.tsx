'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import { renderRichText } from './RichText'

export const BlogPost = ({ blok }) => {
  return (
    <section
      {...storyblokEditable(blok)}
      className="p-16 h-full bg-gray-50"
    >
      <div>
        {blok.body.map((item) => {
          return (
            <div key={item._uid}>
              <h1 className="text-4xl font-bold">{item.title}</h1>

              <div>{renderRichText(item.text)}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
