export interface Author {
  name: string;
  slug: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  author: string; // author slug
  featured?: boolean;
  readingTime?: string;
}

export interface Post extends PostFrontmatter {
  contentHtml: string;
  readingTime: string;
}

export interface PostSummary extends PostFrontmatter {
  readingTime: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  color: "sage" | "rose" | "beige" | "brown";
}
