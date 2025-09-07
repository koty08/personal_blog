/* eslint-disable @next/next/no-img-element */
"use client";

import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import ReactModal from "react-modal";

export default function MarkDownViewer({ content }: { content: string }) {
  return <MDEditor.Markdown source={content} style={{ whiteSpace: "pre-wrap" }} components={{ img: CustomImage }}></MDEditor.Markdown>;
}

const zoomValue: Record<number, string> = {
  1: "scale-[1.0]",
  2: "scale-[1.5]",
  3: "scale-[2.0]",
  4: "scale-[2.5]",
  5: "scale-[3.0]",
};

const CustomImage = ({ ...props }) => {
  const [scale, setScale] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onImgWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    // Zoom In
    if (e.nativeEvent.deltaY < 0) {
      if (scale < 5) setScale((prev) => prev + 1);
    }
    // Zoom Out
    else {
      if (scale > 0) setScale((prev) => prev - 1);
    }
  };
  ReactModal.setAppElement("#main");

  return (
    <span>
      <img className="hover:cursor-pointer" {...props} alt="image" onClick={() => setIsOpen(true)} />
      <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={modalStyles}>
        <div className="w-full h-full flex justify-center items-center" onClick={() => setIsOpen(false)}>
          <img {...props} alt="image" className={`${zoomValue[scale]}`} onWheel={onImgWheel} />
        </div>
      </ReactModal>
    </span>
  );
};

export const CustomDeleteImage = ({ ...props }) => {
  return <img className="hover:cursor-pointer" {...props} alt="image" />;
};

const modalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: "100vh",
    width: "100%",
    zIndex: "100",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    background: "transparent",
    border: "0",
  },
};
