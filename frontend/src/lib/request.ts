import axios, { AxiosRequestConfig } from "axios";

export const request = axios.create({
  timeout: 5000,
});

request.interceptors.request.use(function (config: AxiosRequestConfig) {
  //比如是否需要设置 token
  const jwt = window.sessionStorage.getItem("jwt");
  if (jwt) {
    config!.headers!.Authorization = "Bearer " + jwt;
  }
  console.log(config);

  return config;
});

export const fetcher = (url: string, params: any) =>
  request.get(url, { params }).then((res) => res.data.data);

export const upload = async (files: File[]) => {
  const formData = new FormData();

  Array.from(files).forEach((file: any) => {
    formData.append("files", file, file.name);
  });
  const res = await request.post("/api/upload", formData);
  return res.data;
};
