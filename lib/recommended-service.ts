import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export async function getRecommendedUsers(){
    let userId = null;

    try{
        const self = await getSelf();
        userId = self.id;
    }catch(err){
        userId = null
    }

    let users = [];
    if(userId){
        
      users = await db.user.findMany({
        where :{
            AND : [{
                NOT : {
                    id : userId,
                }
            }, {
                followedBy : {
                    some : {
                        followerId : userId
                    }
                }
            }]
        },
        orderBy : {
            createdAt : "desc"
        }
      })

    }else{
         users = await db.user.findMany({
        orderBy : {
            createdAt : "desc"
        }
    });

    }

    return users;
}