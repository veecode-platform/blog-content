import { DocumentElement } from "@keystatic/core";

export interface IPost {
  title: string;
  summary: string;
  publishedDate: string | null;
  coverImage: string | null;
  wordCount: number | null;
  authors: readonly (string | null)[];
  content: () => Promise<DocumentElement[]>;
}

export interface IAuthor {
    slug: string | null;
    name?: string | undefined;
    role?: string | undefined;
    avatar?: string | null | undefined;
}