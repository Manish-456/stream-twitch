import { db } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';

export async function isBlockedByUser(id : string){
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where : {
                id
            }
        });

        if(!otherUser) throw new Error('User not found');

        if(self.id === otherUser.id){
            return false;
        }

        const existingBlock = await db.block.findUnique({
            where : {
            blockedId_blockerId: {
                blockedId : self.id,
                blockerId : otherUser.id
            }    
            }
        })

        return !!existingBlock;
    } catch (error) {
        return false;
    }
}


export async function blockUser(id : string){
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where : {
            id
        }
    });

    if(!otherUser) throw new Error("User not found");

    if(self.id === otherUser.id) throw new Error("Cannot block yourself");

    const existingBlock = await db.block.findUnique({
        where : {
            blockedId_blockerId : {
                blockedId : otherUser.id,
                blockerId : self.id
            }
        }
    });

    console.log(`ExistingBlock`, existingBlock);

    if(existingBlock) throw new Error("Already blocked");

    const block = await db.block.create({
        data : {
            blockedId : otherUser.id,
            blockerId : self.id
        },
        include : {
            blocked : true
        }
    });

    return block;
}

export async function unBlockUser(id : string){
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where : {
            id
        }
    });

    if(!otherUser) throw new Error("User not found");

    if(self.id === otherUser.id) throw new Error("Cannot block yourself");

    const existingBlock = await db.block.findUnique({
        where : {
            blockedId_blockerId : {
                blockedId : otherUser.id,
                blockerId : self.id
            }
        }
    });

    if(!existingBlock) throw new Error("Not blocked");

    const unblock = await db.block.delete({
        where : {id : existingBlock.id},
        include : {blocked : true}
    })

    return unblock;
}