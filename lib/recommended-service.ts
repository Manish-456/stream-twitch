import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommendedUsers = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
          id : {
            not : userId
          },
              followedBy: {
                none : {
                    followerId: userId,

                }
              },
              blocking: {
                none: {
                  blockedId: userId,
                },
            },
      },
      
      orderBy: {
        createdAt : "desc"
      }
    })
  } else {
    users = await db.user.findMany({
     
      orderBy: 
        {
          createdAt: "desc"
        },
      
    });
  }
  console.log(users);
  return users;
};