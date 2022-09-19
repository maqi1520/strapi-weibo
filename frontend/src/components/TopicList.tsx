import React from "react";
import useSwr from "swr";
import clsx from "clsx";
import { fetcher } from "../lib/request";
import { FieldTopic } from "../types/topic";

const PAGE_SIZE = 20;

const getKey = () => {
  return [
    "/api/topics",
    {
      populate: "*",
      sort: "createdAt:DESC",
      pagination: {
        page: 1,
        pageSize: PAGE_SIZE,
      },
    },
  ]; // SWR key
};

type Props = {
  value: number;
  onChange: (val: number) => void;
};

export default function ToplicList({ value, onChange }: Props) {
  const {
    data = [],
    isValidating,
    mutate,
  } = useSwr<FieldTopic[]>(getKey, fetcher);

  return (
    <div className="space-y-3 p-3">
      <div
        onClick={() => onChange(0)}
        className={clsx(
          "font-semibold cursor-pointer p-3 px-5 rounded hover:bg-orange-50 hover:text-orange-500",
          {
            "bg-orange-50 text-orange-500": value === 0,
          }
        )}
      >
        全部
      </div>
      {data.map((topic) => (
        <div
          onClick={() => onChange(topic.id)}
          className={clsx(
            "font-semibold cursor-pointer p-3 px-5 rounded hover:bg-orange-50 hover:text-orange-500",
            {
              "bg-orange-50 text-orange-500": value === topic.id,
            }
          )}
          key={topic.id}
        >
          {topic.attributes.title}
        </div>
      ))}
    </div>
  );
}
