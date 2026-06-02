import type { ComponentPropsWithoutRef } from "react";

export interface ImageProps extends Omit<ComponentPropsWithoutRef<"img">, "src"> {
  src?: string;
}

export const Image = ({ alt, ...props }: ImageProps) => {
  return <img alt={alt} {...props} />;
};
