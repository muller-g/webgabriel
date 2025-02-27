'use client';
import { Divider } from "@chakra-ui/react";
import styles from "./page.module.css";

export default function DashboardPageEdit() {
    return(
        <div className="wrapp-container">
            <div className="container">
                <h1>Dashboard</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <h1 style={{marginBottom: '10px'}}>Acessos de usuários ao site</h1>
                <div className={styles.stats_content}>
                    <div className={styles.stat}>
                        <span>Hoje</span>
                        <h3>30</h3>
                    </div>
                    <div className={styles.stat}>
                        <span>Mês</span>
                        <h3>30</h3>
                    </div>
                    <div className={styles.stat}>
                        <span>E-mails</span>
                        <h3>30</h3>
                    </div>
                </div>                
            </div>
        </div>
    )
}