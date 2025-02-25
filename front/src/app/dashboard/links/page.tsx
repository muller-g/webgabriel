import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LinksEdit from "./edit";
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function Links() {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
    <main>
      <LinksEdit />
    </main>
  );
}
