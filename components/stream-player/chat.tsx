"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ConnectionState } from "livekit-client";

import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatInfo } from "./chat-info";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export function Chat({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  
  const isOnline = participant && connectionState === ConnectionState.Connected;
  
  const isHidden = !isChatEnabled || !isOnline


  const [value, setValue] = useState("")

  const {chatMessages : messages, send} = useChat();

  useEffect(() => {
    if(matches){
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages]);

  const onSubmit = () => {
    if(!send) return;

    send(value);
    setValue("");
  }

  const onChange = (value : string) => {
    setValue(value);
  }

  return <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
    <ChatHeader />
    {
      variant === ChatVariant.CHAT && (
        <>
        <ChatList
        isHidden={isHidden}
        messages={reversedMessages}
        />
       <ChatForm
        onSubmit={onSubmit}
        value={value}
        isHidden={isHidden}
        isFollowersOnly={isChatFollowersOnly}
        onChange={onChange}
        isDelayed={isChatDelayed}
        isFollowing={isFollowing}
       />
        </>
      )
    }
    {
      variant === ChatVariant.COMMUNITY && (
        <>
        <ChatCommunity
        hostName={hostName}
        viewerName={viewerName}
        isHidden={isHidden}
        />
        </>
      )
    }
  </div>;
}


export function ChatSkeleton(){
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[100vh-80px] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  )
}