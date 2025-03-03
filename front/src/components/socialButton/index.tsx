'use client';
import styles from "./index.module.css";

interface SocialButton {
    text: string,
    url: string,
    icon: any
}

export default function SocialButton({text, url, icon}: SocialButton){
    return(
        <button className={styles.my_link_button} onClick={() => window.open(url, '_blank')}>
            <div className={styles.img_btn} style={{backgroundImage: `url("${process.env.NEXT_PUBLIC_API_ROUTE_BACK + icon}")`}}></div>
            <div className={styles.text_btn}>{text}</div>
        </button>
    )
}