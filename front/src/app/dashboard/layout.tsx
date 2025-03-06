import SidebarWithHeader from "@/components/sideMenu/sideMenu";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
