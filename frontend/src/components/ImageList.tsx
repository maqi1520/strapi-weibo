import React, { useState, useCallback } from "react";
import Image from "next/image";
import { FieldImage } from "../types/image";
import Lightbox from "yet-another-react-lightbox";

type Props = {
  value: FieldImage[] | null;
};

export default function ImageList({ value = [] }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = (index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  if (!value) {
    return null;
  }

  const slides = value.map((item) => ({
    src: item.attributes.url,
    width: item.attributes.width,
    height: item.attributes.height,
  }));

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 w-[572px] mt-3">
        {value.map((item, index) => {
          if (/^video/.test(item.attributes.mime)) {
            return null;
          }
          return (
            <Image
              key={item.id}
              onClick={() => openImageViewer(index)}
              alt=""
              width={136}
              height={136}
              className="object-cover rounded-md block"
              src={item.attributes.url}
            />
          );
        })}
      </div>
      <Lightbox
        carousel={{ finite: true }}
        slides={slides}
        open={isViewerOpen}
        index={currentImage}
        close={closeImageViewer}
      />
    </div>
  );
}
