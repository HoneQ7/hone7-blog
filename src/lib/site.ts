export const SITE = {
  title: 'Hone7 Blog',
  author: 'Hone',
  url: 'https://www.hone7.one',
  description:
    'Hone 的中文个人技术博客，记录算法竞赛、408 考研笔记、AI 专业学习与个人项目开发。'
};

export const NAV_ITEMS = [
  { href: '/', label: '首页' },
  { href: '/blog/', label: '文章' },
  { href: '/tags/', label: '标签' },
  { href: '/projects/', label: '项目' },
  { href: '/about/', label: '关于' }
] as const;
