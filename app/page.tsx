import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
    <h1 className="text-red-500 font-extrabold text-4xl text-center">
      <UserButton afterSignOutUrl="/" />
    </h1>
    </>
  )
}
