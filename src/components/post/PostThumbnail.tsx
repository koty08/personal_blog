"use client";

import Image from "next/image";
import { useState } from "react";

interface PostThumbnailProps {
  path: string | null;
  alt: string;
  className?: string;
  objectFit?: "contain" | "cover";
  sizes?: string;
}

const fallbackPath = "/images/common/no-image.png";

export default function PostThumbnail({ path, alt, className, objectFit = "contain", sizes }: PostThumbnailProps) {
  const [src, setSrc] = useState(path ?? fallbackPath);

  const onError = () => {
    setSrc(fallbackPath);
  };

  return (
    <div className={`relative ${className}`}>
      <Image fill src={src} alt={alt} onError={onError} style={{ objectFit }} sizes={sizes} />
    </div>
  );
}
