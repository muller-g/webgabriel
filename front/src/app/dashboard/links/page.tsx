import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LinksEdit from "./edit";

export default async function Links() {
  const session = await getServerSession();

  if(!session){
    redirect("/")
  }

  return (
    <main>
      <LinksEdit />
    </main>
  );
}
