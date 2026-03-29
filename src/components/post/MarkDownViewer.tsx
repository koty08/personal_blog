"use client";

import { postOptions } from "@/services/post/options";
import { useSuspenseQuery } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import rehypeSanitize from "rehype-sanitize";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function MarkDownViewer() {
  const { uid } = useParams<{ uid: string }>();
  const { data } = useSuspenseQuery(postOptions({ uid }));
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  return (
    <MDEditor.Markdown
      source={data.content}
      components={{ img: CustomImage }}
      className="bg-transparent!"
      rehypePlugins={[rehypeSanitize]}
    />
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
  const src = props.src;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (e.nativeEvent.deltaY < 0) {
      if (scale < 5) setScale((prev) => prev + 1);
    } else {
      if (scale > 1) setScale((prev) => prev - 1);
    }
  };
  ReactModal.setAppElement("#main");

  return (
    <span>
      <Tooltip>
        <TooltipTrigger>
          <Image
            {...props}
            src={src}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            className="hover:cursor-pointer"
            onLoad={(e) => {
              const img = e.currentTarget;
              img.style.width = `${img.naturalWidth}px`;
              img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
            }}
            onClick={() => setIsOpen(true)}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>클릭하여 이미지를 확대할 수 있습니다.</p>
        </TooltipContent>
      </Tooltip>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setScale(1);
        }}
        style={modalStyles}
      >
        <div
          className="flex h-full w-full items-center justify-center"
          onClick={() => {
            setIsOpen(false);
            setScale(1);
          }}
          onWheel={handleWheel}
        >
          <Image
            {...props}
            src={src}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            onLoad={(e) => {
              const img = e.currentTarget;
              img.style.width = `${img.naturalWidth}px`;
              img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
            }}
            className={`transition-transform duration-150 ${zoomValue[scale]}`}
          />
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
            스크롤로 확대/축소 · 클릭으로 닫기
          </div>
        </div>
      </ReactModal>
    </span>
  );
};

export const CustomPreviewImage = ({ ...props }) => {
  return <img {...props} src={props.src} alt="image" className="hover:cursor-pointer" />;
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
