"use client";

import { toast } from 'sonner';
import React, { useTransition } from 'react'

import { onUnblock } from '@/actions/block';
import { Button } from '@/components/ui/button';

interface UnblockButtonProps{
    userId : string;
}
export function UnblockButton({userId} : UnblockButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId).then(data => toast.success(`User ${data.blocked.username} unblocked`))
            .catch(() => toast.error(`Failed to unblock user`))
        })
    }

  return (
    <Button 
    disabled={isPending}
    onClick={handleUnblock}
    variant={"link"}
    size={"sm"}
    className='text-blue-500 w-full'
    >
      Unblock
    </Button>
  )
}
