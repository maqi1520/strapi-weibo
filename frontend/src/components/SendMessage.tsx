/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { sendMessage } from "../lib/message";
import { upload } from "../lib/request";
import { User } from "../types/user";

type Props = {
  callBack: () => {};
  topicId: number;
  user: User;
};

interface ImageData {
  id: number;
  url: string;
}

export default function SendMessage({ callBack, user, topicId }: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const handleSendMesage = async () => {
    if (ref.current && ref.current.value) {
      setLoading(true);
      try {
        await sendMessage({
          content: ref.current.value,
          images: images.map((m) => m.id),
          user: user.id,
          topic: topicId,
        });
        setLoading(false);
        ref.current.value = "";
        setImages([]);
        callBack();
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleFileChange = async (e: any) => {
    const files = e.target.files;
    const res = (await upload(files)) as any;
    setImages(res);
    e.target.value = "";
  };
  return (
    <div className="bg-white rounded-sm shadow-sm p-3">
      <textarea className="w-full border p-3" ref={ref} rows={4}></textarea>
      <div className="flex justify-between items-center">
        <form className="flex items-center space-x-6">
          <div className="shrink-0 flex space-x-3">
            {images.map((image) => (
              <img
                key={image.id}
                className="h-16 w-16 object-cover rounded border"
                src={image.url}
                alt="Current profile photo"
              />
            ))}
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 "
            />
          </label>
        </form>
        <span>
          <button
            onClick={handleSendMesage}
            type="button"
            disabled={loading}
            className="rounded px-3 py-1 bg-orange-500  font-semibold text-white  border border-orange-500"
          >
            发送
          </button>
        </span>
      </div>
    </div>
  );
}
