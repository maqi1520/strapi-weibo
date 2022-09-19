/* eslint-disable @next/next/no-img-element */
import useSWRInfinite from "swr/infinite";
import { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import ImageList from "../components/ImageList";
import { FieldMessage } from "../types/message";
import { User } from "../types/user";
import RegisterModal from "../components/RegisterModal";
import SendMessage from "../components/SendMessage";
import qs from "qs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

import { fetcher } from "../lib/request";
import TopicList from "../components/TopicList";

const PAGE_SIZE = 20;

export default function Home() {
  const [topicId, setTopicId] = useState<number>(0);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("user") || "null"));
  }, []);

  const { data, size, setSize, isValidating, mutate } = useSWRInfinite<
    FieldMessage[]
  >((pageIndex: number, previousPageData: []) => {
    // 一个函数，拿到每个页面的 key，
    // `fetcher` 接受它的返回值。
    // 如果返回是 `null`，该页面不会开始请求。
    if (previousPageData && !previousPageData.length) return null; // reached the end

    let filters: any = undefined;
    if (topicId) {
      filters = {
        topic: {
          id: {
            $eq: topicId,
          },
        },
      };
    }
    const query = qs.stringify(
      {
        populate: "*",
        sort: "createdAt:DESC",
        filters,
        pagination: {
          page: pageIndex + 1,
          pageSize: PAGE_SIZE,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    return [`/api/messages?${query}`]; // SWR key
  }, fetcher);

  const messages = data ? ([] as FieldMessage[]).concat(...data) : [];
  const isEmpty = !isValidating && messages.length === 0;
  const isReachingEnd = isEmpty || (data && messages.length < PAGE_SIZE);

  const logout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <header className="py-4 border-t-4 border-orange-500 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="flex items-center">
            <svg
              role="img"
              className="w-8 h-8 fill-orange-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Nextjs Strapi Messages</title>
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM4.911 7.089h11.456a2.197 2.197 0 0 1 2.165 2.19v5.863a2.213 2.213 0 0 1-2.177 2.178H8.04c-1.174 0-2.04-.99-2.04-2.178v-4.639L4.503 7.905c-.31-.42-.05-.816.408-.816zm3.415 2.19c-.347 0-.68.21-.68.544 0 .334.333.544.68.544h7.905c.346 0 .68-.21.68-.544 0-.334-.334-.545-.68-.545zm0 2.177c-.347 0-.68.21-.68.544 0 .334.333.544.68.544h7.905c.346 0 .68-.21.68-.544 0-.334-.334-.544-.68-.544zm-.013 2.19c-.346 0-.68.21-.68.544 0 .334.334.544.68.544h5.728c.347 0 .68-.21.68-.544 0-.334-.333-.545-.68-.545z" />
            </svg>
            <span className="font-semibold font-mono text-2xl ml-2">
              NSM 微博
            </span>
          </h1>
          {user ? (
            <span className="font-semibold">
              <span> {user.username}</span>
              <span
                className="text-gray-500 ml-3 cursor-pointer"
                onClick={logout}
              >
                退出
              </span>
            </span>
          ) : (
            <div className="space-x-3">
              <LoginModal />
              <RegisterModal />
            </div>
          )}
        </div>
      </header>

      <main className="min-h-screen max-w-5xl mx-auto flex gap-5 mt-5">
        <div className="sticky top-14 bg-white w-52 flex-none rounded-sm shadow-sm">
          <TopicList value={topicId} onChange={setTopicId} />
        </div>
        <div className="flex-auto space-y-3">
          {user && (
            <SendMessage user={user} topicId={topicId} callBack={mutate} />
          )}
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className="bg-white rounded-sm shadow-sm p-3"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">
                    {message.attributes.user?.data?.attributes.username}
                  </span>

                  <span>{dayjs().to(dayjs(message.attributes.createdAt))}</span>
                </div>
                <p> {message.attributes.content}</p>
                <ImageList value={message.attributes.images.data} />
              </div>
            );
          })}
          {isEmpty && <div className="text-center text-gray-500">暂无数据</div>}
          {isValidating && (
            <div className="text-center text-gray-500">加载中...</div>
          )}
          {isReachingEnd && (
            <div className="text-center text-gray-500">没有更多数据</div>
          )}
        </div>
      </main>
      <footer className="bg-white py-2 text-center mt-5">
        Copyright © 2009-2022 随时随地发现新鲜事
      </footer>
    </>
  );
}
