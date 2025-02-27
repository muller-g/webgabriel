import { redirect } from 'next/navigation';
import styles from './page.module.css';
import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/route';
import DashboardPageEdit from './edit';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
  
    if(!session){
      redirect("/adm")
    }

    return (
      <main className={styles.main}>
        <DashboardPageEdit />
      </main>
    );
}