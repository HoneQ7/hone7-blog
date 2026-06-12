import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export function getWordCount(body = '') {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\u4e00-\u9fa5]+/gu, ' ')
    .trim();

  if (!text) {
    return 0;
  }

  const cjkCount = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const latinWordCount = text
    .replace(/[\u4e00-\u9fa5]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return cjkCount + latinWordCount;
}

export function getReadingTime(body = '') {
  const words = getWordCount(body);
  return Math.max(1, Math.ceil(words / 400));
}

export function getAllTags(posts: BlogPost[]) {
  return Array.from(new Set(posts.flatMap((post) => post.data.tags))).sort(
    (a, b) => a.localeCompare(b, 'zh-CN')
  );
}
