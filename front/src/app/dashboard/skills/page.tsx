import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SkillsEdit from "./edit";
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function Skills() {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
    <main>
      <SkillsEdit />
    </main>
  );
}
