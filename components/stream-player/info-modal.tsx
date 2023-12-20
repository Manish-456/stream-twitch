"use client";

import { toast } from "sonner";
import { ElementRef, useRef, useState, useTransition } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { updateStream } from "@/actions/stream";

import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";


interface InfoModal {
  initialName: string;
  initialThumbnailUrl: string | null;
}
export function InfoModal({ initialName, initialThumbnailUrl }: InfoModal) {
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const router = useRouter();
  const [name, setName] = useState(initialName);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name })
        .then(() => {
            toast.success("Stream updated");
            closeRef?.current?.click()
        })
        .catch(() => toast.error("Failed to update stream"));
    });
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({thumbnail : null}).then(()=> {
        toast.success("Thumbnail removed");
        setThumbnailUrl("");
        closeRef?.current?.click();
      }).catch(() => toast.error("Failed to remove thumbnail"));
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form className="space-y-14" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
            disabled={isPending}
            placeholder="Stream name" onChange={onChange} value={name} />
          </div>
          <div className="space-y-2">
          <Label>
          Thumbnail
          </Label>
         {
          thumbnailUrl ? (<>
            <div className="aspect-video relative rounded-xl overflow-hidden border border-white/10">
              <div className="absolute top-2 right-2 z-[10]">
                <Hint label="Remove Thumbnail" asChild side="left">
                  <Button  disabled={isPending} type="button" onClick={onRemove} className="h-auto w-auto p-1.5">
                  <Trash  className="h-4 w-4"/>
                  </Button>
                </Hint>
              </div>
              <Image 
              src={thumbnailUrl}
              fill
              alt="Thumbnail"
              className="object-cover" />
            </div>

          </>) : ( <div className="rounded-xl border ourline-dashed outline-muted">
          <UploadDropzone
          endpoint="thumbnailUpload"
          appearance={{
           label : {
           color : "#ffffff"
          },
          allowedContent : {
           color : "#ffffff"
          }
          }
          }

          onClientUploadComplete={(res) => {
          setThumbnailUrl(res?.[0].url);
          router.refresh();
          closeRef?.current?.click();
          }}
           />
          </div>)
         }
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button type="button" variant={"ghost"}
              ref={closeRef}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button variant={"primary"} type="submit" disabled={isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
