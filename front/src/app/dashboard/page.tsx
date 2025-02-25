import { redirect } from 'next/navigation';
import styles from './page.module.css';
import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
  
    if(!session){
      redirect("/")
    }

    return (
      <main className={styles.main}>
        <h1>Dashboard</h1>
      </main>
    );
}