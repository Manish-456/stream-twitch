"use client";

import { useTransition } from "react";

import { onFollow, onUnFollow } from "@/actions/follow";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}

export function Actions({ isFollowing, userId }: ActionProps) {
  const [isPending, startTransation] = useTransition();

  const handleFollow = () => {
    startTransation(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("failed to follow user"));
    });
  };

  const handleUnFollow = () => {
    startTransation(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("failed to follow user"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button disabled={isPending} variant={"primary"} onClick={onClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
