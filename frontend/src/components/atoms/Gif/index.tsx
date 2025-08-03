import React from "react";

interface GifProps {
  src: string;
  width?: string;
  height?: string;
  alt?: string;
}

export const Gif = (props: GifProps) => {
  const { src, width, height, alt } = props;

  return <img src={src} width={width} height={height} alt={alt} />;
};
