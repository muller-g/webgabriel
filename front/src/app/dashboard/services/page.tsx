import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ServicesEdit from "./edit";
import { authOptions } from "@/utils/authOptions";

export default async function Services() {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/")
  }

  return (
      <main>
        <ServicesEdit />
      </main>
  );
}
