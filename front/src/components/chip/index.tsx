import styles from "./index.module.css";

export default function Chip({img, text}: any){
    return(
        <div className={styles.chip}>
            <div className={styles.chip_icon}>
                <img src={img} alt="icon" />
            </div>
            <div className={styles.chip_span}>
                <span>{text}</span>
            </div>
        </div>
    )
}