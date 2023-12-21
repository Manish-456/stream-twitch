"use server";

import { revalidatePath } from "next/cache";
import { blockUser, unBlockUser } from "@/lib/block-service";
import { getSelf } from "@/lib/auth-service";

export async function onBlock(id : string){
        
        const blockedUser = await blockUser(id);
        
        revalidatePath("/")

    if(blockedUser){
        revalidatePath(`/${blockedUser.blocked.username}`)
    }

    return blockedUser;

    
}

export async function onUnblock(id : string){
    const self = await getSelf();

    const unblockedUser = await unBlockUser(id);

    revalidatePath(`/u/${self.username}/community`)

    return unblockedUser;

}