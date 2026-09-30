import { samplePosts } from './data/posts';

export default function sitemap() {
  const baseUrl = 'http://localhost:3000';

  // Article URLs
  const articleUrls = samplePosts.map((post) => ({
    url: `${baseUrl}/article/${post.id}`,
    lastModified: new Date(),
  }));

  // Static Pages
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
    },
    ...articleUrls,
  ];
}