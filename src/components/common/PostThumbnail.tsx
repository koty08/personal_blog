"use client";

import Image from "next/image";
import { useState } from "react";

interface PostThumbnailProps {
  path: string | null;
  alt: string;
  className?: string;
}

const basePath = "/images/post";
const fallbackPath = "/images/common/no-image.png";

export default function PostThumbnail({ path, alt, className }: PostThumbnailProps) {
  const [src, setSrc] = useState(path ? basePath + path : fallbackPath);

  const onError = () => {
    setSrc(fallbackPath);
  };

  return (
    <div className={`relative ${className}`}>
      <Image fill src={src} alt={alt} onError={onError} style={{ objectFit: "contain" }} />
    </div>
  );
}
