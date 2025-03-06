import { getServerSession } from "next-auth";
import PortfolioEdit from "./edit";
import styles from "./page.module.css";
import { authOptions } from "@/utils/authOptions";

export default async function Portfolio() {
    const session = await getServerSession(authOptions);
    
    return (
      <main className={styles.main}>
        <PortfolioEdit session={session}/>
      </main>
    );
}
