import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AvaliationsEdit from "./edit";

export default async function Avaliations() {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
    <main>
      <AvaliationsEdit session={session}/>
    </main>
  );
}
