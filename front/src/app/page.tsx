import PortfolioEdit from "./edit";
import styles from "./page.module.css";

export default async function Portfolio() {
    const response = await fetch('https://api.gabrielmullerdev.com.br/api/developer');
    const data = await response.json(); 

    return (
      <main className={styles.main}>
        <PortfolioEdit data={data}/>
      </main>
    );
}
