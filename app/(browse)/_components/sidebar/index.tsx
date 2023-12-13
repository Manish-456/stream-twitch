import React from "react";

import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Recommended, RecommendedUserSkeleton } from "./recommended";
import { getRecommendedUsers } from "@/lib/recommended-service";

export async function Sidebar() {
  const recommendedUsers = await getRecommendedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommendedUsers} />
      </div>
    </Wrapper>
  );
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
      <RecommendedUserSkeleton />
    </aside>
  );
};
