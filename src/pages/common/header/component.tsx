import { useEffect } from "react";
import styles from "./component.module.scss";
export default function Header () {

  useEffect(()=>{

    const headerScrollControlHandle = () => {
      const header = document.getElementById("header");
      window.scrollY?
      header?.classList.add(styles.scroll):
      header?.classList.remove(styles.scroll);
    }

    window.addEventListener("scroll", headerScrollControlHandle)


  }, []);

  return ( <header id="header" className={styles.headerContainer}>

    <img src="/icons/header.svg" alt="fidelis-header-logo" className={styles.logo}/>

    <ul className={styles.header}>
      <li className={`${styles.headerElement} ${styles.firstHeaderElement}`}> {"главная"} </li>
      <li className={styles.headerElement}> {"о нас"} </li>
      <li className={styles.headerElement}> {"ассортимент"} </li>
      <li className={styles.headerElement}> {"контакты"} </li>
      <li className={`${styles.headerElement} ${styles.lastHeaderElement}`}> <p className={styles.lastHeaderElementContent}>{"связаться"}</p>
      <img src="/icons/arrow-right.svg" alt="contact-us-icon" className={styles.contactUsIcon}/> </li>
    </ul>

  </header> )
}