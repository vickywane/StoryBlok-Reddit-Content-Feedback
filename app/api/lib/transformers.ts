export const transformComments = (comments: any) => {
  // @ts-ignore
  return comments?.map((item: any) => ({
    submitTextHtml: item.data.submit_text_html,
    displayName: item.data.display_name,
    headerImg: item.data.header_img,
    publicDescription: item.data.public_description,
    communityIcon: item.data.community_icon,
    submitText: item.data.submit_text,
    descriptionHtml: item.data.description_html,
    headerTitle: item.data.header_title,
    publicDescriptionHtml: item.data.public_description_html,
    description: item.data.description,
    url: item.data.url,
    id: item.data.id,
    bannerBackgroundColor: item.data.banner_background_color,
    suggestedCommentSort: item.data.suggested_comment_sort,
  }));
};

export const transformArrayComments = (comments: any) => {
  // @ts-ignore
  return comments?.map((item: any) => ({
    selftext: item.data.selftext,
    title: item.data.title,
    subreddit_name_prefixed: item.data.subreddit_name_prefixed,
    name: item.data.name,
    author_fullname: item.data.author_fullname,
    link_flair_text: item.data.link_flair_text,
    selftext_html: item.data.selftext_html,
    permalink: item.data.permalink,
  }));
};

export const transformPosts = (posts: any) => {
  // @ts-ignore
  return posts.map((post) => ({
    id: post.id,
    subredditNamePrefixed: post.subreddit_name_prefixed,
    title: post.title,
    authorFullname: post.author_fullname,
    name: post.name,
    linkFlairText: post.link_flair_text,
    permalink: post.permalink,
    url: post.url,
    createdUtc: post.created_utc,
    subredditSubscribers: post.subreddit_subscribers,
  }));
};
