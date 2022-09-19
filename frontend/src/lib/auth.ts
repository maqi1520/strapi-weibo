import { request } from "./request";

export interface LoginData {
  identifier?: string;
  password?: string;
}

export interface RegisterData {
  username?: string;
  email?: string;
  password?: string;
}

export function login(data: LoginData) {
  return request.post("/api/auth/local", data);
}

export function register(data: RegisterData) {
  return request.post("/api/auth/local/register", data);
}
