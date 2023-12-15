"use server";

import { revalidatePath } from "next/cache";
import { blockUser, unBlockUser } from "@/lib/block-service";

export async function onBlock(id : string){
    // TODO : Adapt to disconnect from livestream
    // TODO : Allow ability to kick the guest
        
        const blockedUser = await blockUser(id);
        
        revalidatePath("/")

    if(blockedUser){
        revalidatePath(`/${blockedUser.blocked.username}`)
    }

    return blockedUser;

    
}

export async function onUnblock(id : string){
    const unblockedUser = await unBlockUser(id);

    revalidatePath("/")

    if(unblockedUser){
        revalidatePath(`/${unblockedUser.blocked.username}`)
    }

    return unblockedUser;

}