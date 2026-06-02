import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "container mx-auto text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100",
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface HeadingProps
  extends ComponentPropsWithoutRef<"h1">,
    VariantProps<typeof headingVariants> {
  title: string;
}

export const Heading = ({ className, title, ...props }: HeadingProps) => {
  return (
    <h1 className={cn(headingVariants(), className)} {...props}>
      {title}
    </h1>
  );
};
