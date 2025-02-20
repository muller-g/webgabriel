import SidebarWithHeader from "@/component/sideMenu/sideMenu";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if(!session){
    redirect("/")
  }

  return (
    <SidebarWithHeader session={session}>
      {children}
    </SidebarWithHeader>
  );
}
