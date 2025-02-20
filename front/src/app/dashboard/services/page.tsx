import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ServicesEdit from "./edit";

export default async function Services() {
  const session = await getServerSession();

  if(!session){
    redirect("/")
  }

  return (
      <main>
        <ServicesEdit />
      </main>
  );
}
