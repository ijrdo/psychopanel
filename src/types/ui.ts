import { ReactNode } from "react";
export type PrimaryBTN = {
  children: ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};
export type CustomLinkType = {
  children: ReactNode;
  to: string;
  active?: boolean;
};

export type primaryAuthor = {
  affiliation: string;
  country: string;
  email: string;
  name: string;
  phone: string;
};
export type secondaryAuthors = primaryAuthor[];
export type authors = {
  primary: primaryAuthor;
  secondaryAuthors: primaryAuthor[];
};
export type ArticleType = {
  abstract: string;
  articleId: string;
  createdAt: number;
  authorDetails: authors;
  day: string;
  isHidden: boolean;
  month: string;
  keywords: string[];
  primaryAuthor: string;
  secondaryAuthors: string[];
  status: string;
  submissionDate: number;
  title: string;
  updatedAt: number;
  year: string;
};
