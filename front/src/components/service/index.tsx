'use client';
import styles from "./index.module.css";

interface Service {
    text: string,
    title: string,
    icon: any
}

export default function Service({text, title, icon}: Service){
    return(
        <div className={styles.service}>
            <div className={styles.service_img}>
                {icon}
            </div>
            <div className={styles.service_content}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    )
}