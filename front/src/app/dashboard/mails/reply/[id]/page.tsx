import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ReplyEmailEdit from "./edit";

export default async function ReplyEmail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
    <main>
      <ReplyEmailEdit session={session} id={params.id}/>
    </main>
  );
}
