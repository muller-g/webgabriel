import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AnswerEmailEdit from "./edit";

export default async function AnswerEmail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
    <main>
      <AnswerEmailEdit session={session} id={params.id}/>
    </main>
  );
}
