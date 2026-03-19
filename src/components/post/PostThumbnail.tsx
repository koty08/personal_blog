"use client";

import { imagePath } from "@/consts/posts";
import Image from "next/image";
import { useState } from "react";

interface PostThumbnailProps {
  path: string | null;
  alt: string;
  className?: string;
  objectFit?: "contain" | "cover";
}

const fallbackPath = "/images/common/no-image.png";

export default function PostThumbnail({ path, alt, className, objectFit = "contain" }: PostThumbnailProps) {
  const [src, setSrc] = useState(path ? imagePath + path : fallbackPath);

  const onError = () => {
    setSrc(fallbackPath);
  };

  return (
    <div className={`relative ${className}`}>
      <Image fill src={src} alt={alt} onError={onError} style={{ objectFit }} />
    </div>
  );
}
