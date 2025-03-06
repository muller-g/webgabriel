import { getServerSession } from "next-auth";
import PortfolioEdit from "./edit";
import styles from "./page.module.css";
import { authOptions } from "@/utils/authOptions";

export default async function Portfolio() {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + '/developer');
    const session = await getServerSession(authOptions);
    
    const data = await response.json(); 

    return (
      <main className={styles.main}>
        <PortfolioEdit data={data} session={session}/>
      </main>
    );
}
