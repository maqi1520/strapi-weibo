import { request } from "./request";

export function sendMessage(data: any) {
  return request.post("/api/messages", { data });
}
