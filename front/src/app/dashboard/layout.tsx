import SidebarWithHeader from "@/components/sideMenu/sideMenu";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
    <SidebarWithHeader session={session}>
      {children}
    </SidebarWithHeader>
  );
}
