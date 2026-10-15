"use client";

import { forwardRef, ReactElement } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, href, disabled, className, children }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (href && !disabled) {
        if (href.startsWith("http")) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = href;
        }
      }
    };

    return (
      <button
        ref={ref}
        className={
          "rounded-xl py-3.5 px-8 font-medium transition-all cursor-pointer"
        }
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";