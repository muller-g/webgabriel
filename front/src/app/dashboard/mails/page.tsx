import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MailsEdit from "./edit";

export default async function Mails() {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
    <main>
      <MailsEdit session={session}/>
    </main>
  );
}
