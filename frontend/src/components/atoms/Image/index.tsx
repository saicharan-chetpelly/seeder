import React from "react";
interface ImageProps {
  src: string;
  width?: string;
  height?: string;
  alt?: string;
  style?: React.CSSProperties;
}
const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  alt,
  style
}: ImageProps) => {
  return <img src={src} width={width} alt={alt} height={height} style={style}/>;
};

export default Image;
