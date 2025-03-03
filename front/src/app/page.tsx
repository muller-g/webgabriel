import PortfolioEdit from "./edit";
import styles from "./page.module.css";

export default async function Portfolio() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/developer`);
    const data = await response.json(); 

    return (
      <main className={styles.main}>
        <PortfolioEdit data={data}/>
      </main>
    );
}
