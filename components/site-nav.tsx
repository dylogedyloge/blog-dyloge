"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bonheur_Royale } from "next/font/google";
// import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler"
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const bonheurRoyale = Bonheur_Royale({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function SiteNav() {
  const router = useRouter();

  const handleTemplatesClick = () => {
    router.push("/templates");
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto w-full flex h-14 items-center justify-between px-6">
        <div className="  mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 font-medium text-lg tracking-tighter"
          >
            <span
              className={`${bonheurRoyale.className} text-3xl md:text-4xl leading-none text-primary`}
            >
              Dyloge
            </span>
          </Link>
        </div>

        <div className="flex flex-1 w-full justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <ShimmerButton
              className="text-sm font-medium"
              shimmerColor="#ffffff"
              // background="rgba(0, 0, 0, 0.1)"
              borderRadius="12px"
              onClick={handleTemplatesClick}
            >
              Templates
            </ShimmerButton>
            <AnimatedThemeToggler />
          </nav>
        </div>
      </div>
    </header>
  );
}
