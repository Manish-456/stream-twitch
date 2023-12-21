import { getBlockedUsers } from "@/lib/block-service"
import { BlockedUser , columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { format } from "date-fns";


async function getData(): Promise<BlockedUser[]> {
    const blockedUsers = await getBlockedUsers();

    const formattedData = blockedUsers.map(block => ({
        ...block,
        userId : block.blocked.id,
        imageUrl : block.blocked.imageUrl,
        username : block.blocked.username,
        // @ts-ignore
        createdAt : format(new Date(block.blocked.createdAt), "dd/MM/yyy")
    }));

    return formattedData
}  
export default async function CommunityPage() {
    const data = await getData()

  return (
    <div className="p-6">
        <div className="mb-4">
            <h1 className="text-2xl font-bold">
                Community Settings
            </h1>
        </div>

            <DataTable columns={columns} data={data} />
    </div>
  )
}
