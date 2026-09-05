import styles from "./component.module.scss";
export default function Header () {

  return ( <header id="header" className={styles.headerContainer}>

    <div className={styles.logoContainer}>
      <img src="/icons/header.svg" alt="fidelis-header-logo" className={styles.logo}/>
    </div>

    <ul className={styles.header}>
      <li className={styles.headerElement}> {"главная"} </li>
      <li className={styles.headerElement}> {"о нас"} </li>
      <li className={styles.headerElement}> {"ассортимент"} </li>
      <li className={styles.headerElement}> {"контакты"} </li>
      <li className={styles.headerElement}> {"связаться"} <img src="/icons/arrow-right" alt="contact-us-icon" className={styles.contactUsIcon}/> </li>
    </ul>

  </header> )
}