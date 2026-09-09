import { useEffect } from "react";
import styles from "./component.module.scss";
export default function Header () {

  useEffect(()=>{

    const windowResizeHandle = () => {
      const coefficient = (window.innerWidth/2000) - .15;


      Object.assign(document.documentElement, {
        style: `
        --background-height-coefficient: ${coefficient};
        `
      });
    }

    window.addEventListener("resize", windowResizeHandle);
    return () => window.removeEventListener("resize", windowResizeHandle);

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