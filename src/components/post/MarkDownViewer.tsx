"use client";

import { imagePath } from "@/consts/posts";
import { postOptions } from "@/services/post/options";
import { useSuspenseQuery } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

export default function MarkDownViewer() {
  const { uid } = useParams<{ uid: string }>();
  const { data } = useSuspenseQuery(postOptions({ uid }));
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  return (
    data && (
      <MDEditor.Markdown
        source={data.content}
        components={{ img: CustomImage }}
        className="bg-inherit! whitespace-pre-wrap"
      ></MDEditor.Markdown>
    )
  );
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
  const src = `${imagePath.client}${props.src}`;

  const onImgWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    if (e.nativeEvent.deltaY < 0) {
      if (scale < 5) setScale((prev) => prev + 1);
    } else {
      if (scale > 0) setScale((prev) => prev - 1);
    }
  };
  ReactModal.setAppElement("#main");

  return (
    <span>
      <img {...props} src={src} alt="image" className="hover:cursor-pointer" onClick={() => setIsOpen(true)} />
      <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={modalStyles}>
        <div className="flex h-full w-full items-center justify-center" onClick={() => setIsOpen(false)}>
          <img {...props} src={src} alt="image" className={`${zoomValue[scale]}`} onWheel={onImgWheel} />
        </div>
      </ReactModal>
    </span>
  );
};

export const CustomPreviewImage = ({ ...props }) => {
  return <img {...props} src={`${imagePath.client}${props.src}`} alt="image" className="hover:cursor-pointer" />;
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
