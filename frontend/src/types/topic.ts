export interface FieldTopic {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  messages: Messages;
}

export interface Messages {
  data: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
