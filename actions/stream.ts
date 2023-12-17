"use server";

import { Stream } from "@prisma/client";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateStream(values : Partial<Stream>){
    try {
       const self = await getSelf();
        const selfstream = await db.stream.findUnique({
            where : {
                userId : self.id
            }
        })

        if(!selfstream){
            throw new Error(`Stream not found`);
        }

        const validData = {
            name : values.name,
            isChatEnabled : values.isChatEnabled,
            isChatDelayed : values.isChatDelayed,
            isChatFollowersOnly : values.isChatFollowersOnly
        }    

        const stream = await db.stream.update({
            where : {
                id : selfstream.id
            },
            data : {
                ...validData
            }
        });

        revalidatePath(`/u/${self.username}/chat`);
        revalidatePath(`/u/${self.username}`);
        revalidatePath(`/${self.username}`);
        
        return stream;
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}