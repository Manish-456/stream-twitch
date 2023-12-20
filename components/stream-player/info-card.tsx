"use client";

import { Pencil } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { InfoModal } from "./info-modal";

interface InfoCardProps {
  name: string;
  viewerIdentity: string;
  hostIdentity: string;
  thumbnailUrl: string | null;
}

export function InfoCard({
  name,
  viewerIdentity,
  hostIdentity,
  thumbnailUrl,
}: InfoCardProps) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="h-auto w-auto rounded-md bg-blue-600 p-2">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
                Maximize your visibility
            </p>
          </div>
        
        <InfoModal
         initialName={name}
         initialThumbnailUrl={thumbnailUrl}
        />

        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
            <div>
                <h3 className="text-sm text-muted-foreground mb-2">
                    Name
                </h3>
                <p className="text-sm font-semibold">
                    {name}
                </p>
            </div>
            <div>
                <h3 className="text-sm text-muted-foreground mb-2">
                    Thumbnail
                </h3>
                    {thumbnailUrl &&
                <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                        <Image
                        src={thumbnailUrl}
                        fill
                        alt={name}
                        className="object-cover"
                        />
                </div>
                    }
            </div>
        </div>
      </div>
    </div>
  );
}
