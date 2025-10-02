/* eslint-disable @next/next/no-img-element */
import React from "react";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

interface PromoContentProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function PromoContent({
  variant = "desktop",
  className,
}: PromoContentProps) {
  if (variant === "mobile") {
    return (
      <NeonGradientCard>
        <div className="flex items-center gap-3">
          <img
            src="/magicui-logo.png"
            alt="Magic UI"
            className="w-8 h-8 rounded object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground/90 truncate">
              View My Shop
            </p>
            <p className="text-xs text-muted-foreground truncate">
              See all of my designs and products.
            </p>
          </div>
          <a
            href="http://www.wix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:text-primary/80 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more
          </a>
        </div>
      </NeonGradientCard>
    );
  }

  return (
    <NeonGradientCard>
      <a
        href="http://www.wix.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex flex-col gap-4">
          <img
            src="/magicui-logo.png"
            alt="Magic UI"
            className="w-full h-40 rounded-md object-cover"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold tracking-tighter">
              View My Shop
            </h3>
            <p className="text-sm text-muted-foreground">
              See all of my designs and products.
            </p>
          </div>
        </div>
      </a>
    </NeonGradientCard>
  );
}
