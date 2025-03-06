import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LinksEdit from "./edit";
import { authOptions } from "@/utils/authOptions";

export default async function Links() {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
    <main>
      <LinksEdit session={session}/>
    </main>
  );
}
