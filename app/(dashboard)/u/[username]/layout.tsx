import React from "react";
import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}
export default async function CreatorLayout({
  children,
  params,
}: CreatorLayoutProps) {
 const self = await getSelfByUsername(params.username);

 if(!self) redirect("/");

  return <>
  <Navbar />
  <div className="h-full pt-20 flex"> 
  <Sidebar />
  <Container>
  {children}
  </Container>
  </div>
  </>;
}
