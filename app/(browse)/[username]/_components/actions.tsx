"use client";

import { startTransition, useTransition } from "react";

import { onFollow, onUnFollow } from "@/actions/follow";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

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

  const handleBlock = () => {
    startTransation(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`Blocked the user ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`You have unblocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Failed to unblock user"));
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
    <>
      <Button disabled={isPending} variant={"primary"} onClick={onClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleUnblock}>unBlock</Button>
    </>
  );
}
