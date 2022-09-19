import { ListFieldImage } from "./image";
import { ListFieldUser } from "./user";

export interface FieldMessage {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  content: string;
  images: ListFieldImage;
  user: ListFieldUser;
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
