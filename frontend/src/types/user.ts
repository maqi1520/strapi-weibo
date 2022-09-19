export interface ListFieldUser {
  data: FieldUser;
}

export interface FieldUser {
  id: number;
  attributes: Attributes;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attributes {
  username: string;
  email: string;
}
