"use client";

import { useIsClient } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

import { ToggleSkeleton } from "./toggle";
import { RecommendedUserSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const isClient = useIsClient();
  const { collapsed } = useSidebar();

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[72px] lg:w-60 h-full bg-background border-r border-[#2d2e35]">
        <ToggleSkeleton />
        <FollowingSkeleton/>
        <RecommendedUserSkeleton />
      </aside>
    );
  }
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-[50]",
        {
          "w-[72px]": collapsed,
        }
      )}
    >
      {children}
    </aside>
  );
}
