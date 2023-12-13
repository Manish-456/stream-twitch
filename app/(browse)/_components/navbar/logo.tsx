import Link from "next/link";
import Image from "next/image"
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

 const font = Poppins({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets : ["latin"]
})

export function Logo() {
  return (
 <Link href={"/"}>
  <div className="flex items-center gap-x-4 hover:opacity-75 transition">
  <div className="bg-white lg:mr-0 mr-12 shrink-0 rounded-full p-1">
    <Image
    src={'/spooky.svg'}
    alt="streamhub"
    height={32}
    width={32}
    />
  </div>
  <div className={cn("hidden lg:block", font.className)}>
  <p className="text-lg font-semibold">
    Streamhub
  </p>
  <p className="text-xs text-muted-foreground">Let&apos;s play</p>
 </div>
  </div>
 </Link>
  )
}
