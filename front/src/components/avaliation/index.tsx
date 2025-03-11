'use client';
import styles from "./index.module.css";

interface AvaliationInterface {
    name: string,
    message: string,
}

export default function Avaliation({name, message}: AvaliationInterface){
    return(
        <div className={styles.avaliation}>
            <div className={styles.avaliation_content}>
                <h1>{name}</h1>
                <p>{message}</p>
            </div>
        </div>
    )
}