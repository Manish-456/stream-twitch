"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
  initialValue: string | null;
}

export function BioModal({ initialValue }: BioModalProps) {
  const [value, setValue] = useState(initialValue || "");
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null)

  const onSubmit = (e : React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({bio : value}).then(() => {
        toast.success("User bio updated");
        closeRef?.current?.click();
      })
      .catch(() => {toast.error("Failed to update bio")})
      ;
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea 
          placeholder="User bio" 
          onChange={(e) => setValue(e.target.value)} 
          value={value} 
          disabled={isPending}
          className="resize-none"
          />
            <div className="flex justify-between">
                <DialogClose asChild>
                    <Button type="button" ref={closeRef} variant={"ghost"}>
                        Cancel
                    </Button>
                </DialogClose>

                <Button disabled={isPending} type="submit" variant={"primary"}>
                    Save changes
                </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
