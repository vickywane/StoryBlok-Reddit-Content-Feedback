'use client';
// import {
//   RichTextVideoStoryblok,
//   type ImageStoryblok,
//   type RichTextImagesStoryblok,
// } from '@/generated/extracted-types';
import {
  StoryblokServerComponent,
  type ISbRichtext,
} from '@storyblok/react/rsc';
import cn from 'classnames';
import { render } from 'storyblok-rich-text-react-renderer';

import { Children, ReactNode } from 'react';

export function renderRichText(content: ISbRichtext) {
  return render(content, {
    // markResolvers: {
    //   bold: (children) => <strong>{children}</strong>,
    // },

    nodeResolvers: {
      bullet_list: (children: ReactNode) => {
        return (
          <ul className=" list-disc pl-6 [&>li>p]:mt-0 [&>li]:m-0 [&>li]:p-0">
            {children}
          </ul>
        );
      },

      ordered_list: (children: ReactNode) => {
        return (
          <ol className="[&] mb-6 list-decimal pl-6 [&>li>p]:m-0 [&>li]:m-0 [&>li]:p-0">
            {children}
          </ol>
        );
      },
      paragraph: (children: ReactNode) => {
        return <p className="s:mb-7 mb-5">{children}</p>;
      },
      heading: (children: ReactNode, props:{ level: 1 | 2 | 3 | 4 | 5 | 6; }) => {
        const clasess = 'mb-4 mt-8 s:mb-6 s:mt-20';
        switch (props.level) {
          case 2:
            return (
              <h2 className={cn(clasess, 'text-h2-avanti-900 text-dark-01')}>
                {children}
              </h2>
            );
          case 3:
            return (
              <h3 className={cn(clasess, 'text-h3-avanti-900 text-dark-01')}>
                {children}
              </h3>
            );
          case 4:
            return (
              <h4 className={cn(clasess, 'text-h4-avanti-900 text-dark-01')}>
                {children}
              </h4>
            );
          case 5:
            return (
              <h5 className={cn(clasess, 'text-h5-avanti-900 text-dark-01')}>
                {children}
              </h5>
            );
          case 6:
            return (
              <h6 className={cn(clasess, 'text-h6-avanti-900 text-dark-01')}>
                {children}
              </h6>
            );
          default:
            return (
              <h1 className={cn(clasess, 'text-h1-avanti-900 text-dark-01')}>
                {children}
              </h1>
            );
        }
      },
    },

    blokResolvers: {
      // // @ts-ignore
      // 'rich-text-video': (props: RichTextVideoStoryblok) => {
      //   return <ExternalVideoPlayer blok={props} />;
      // },
      // // @ts-ignore
      // 'rich-text-video-asset': (props: RichTextVideoAssetStoryblok) => {
      //   return <VideoAssetPlayer blok={props} />;
      // },

      // // @ts-ignore
      // 'rich-text-images': (props: { images: RichTextImagesStoryblok[] }) => {
      //   if(!(props.images || (props as any).image)) return null;
        
      //   if ((props.images || (props as any).image).length === 1) {
      //     // @ts-ignore
      //     const asset = props?.images?.[0].asset || (props as any).image?.[0].asset;
      //     return (
      //       <>
      //         {asset && (
      //           <figure className="s:my-20 my-8">
      //             <img
      //               src={asset.filename}
      //               alt=""
      //               className="mx-auto w-full rounded-xl"
      //             />
      //             {asset.title && (
      //               <figcaption className="s:text-meta1-inter-400 text-meta2-inter-400 text-grey-07 mt-4 text-center">
      //                 {asset.title}
      //               </figcaption>
      //             )}
      //           </figure>
      //         )}
      //       </>
      //     );
      //   } else return <ImageSlider images={(props.images || (props as any).image)} />;
      // },

      cardsGrid: (props) => {
        return (
          <StoryblokServerComponent
            blok={{
              ...props,
              component: 'cardsGrid',
              paddingX: 'none',
            }}
          />
        );
      },

      linksList: (props) => {
        return (
          <StoryblokServerComponent
            blok={{
              ...props,
              component: 'linksList',
              paddingX: 'none',
            }}
          />
        );
      },

      logos: (props) => {
        return (
          <StoryblokServerComponent
            blok={{
              ...props,
              component: 'logos',
              paddingX: 'none',
            }}
          />
        );
      },

      stepGuide: (props) => {
        return (
          <StoryblokServerComponent
            blok={{
              ...props,
              component: 'stepGuide',
              paddingX: 'none',
            }}
          />
        );
      },
    },
  });
}
