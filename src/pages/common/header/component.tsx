import { useEffect, useRef, useState } from "react";
import { ProgressiveLayerBlur } from "../effects/component";
import styles from "./component.module.scss";
export default function Header () {
  const [ windowIsSmall, setWindowIsSmall ] = useState<boolean>(false);
  useEffect(()=>{
    if (window.innerWidth <= 800) setWindowIsSmall(true);
    const headerSections = Array.from(document.querySelectorAll<HTMLLIElement>(`.${styles.headerElement}`));
    const updateMoverPosition = (event: MouseEvent|null = null) => {
      const selectedSection = !event?headerSections[0]:event.currentTarget as HTMLLIElement;
      const mover = document.querySelector<HTMLDivElement>(`.${styles.headerSelector}`);
      const header = document.querySelector<HTMLUListElement>(`.${styles.header}`)
      if (!selectedSection || !mover || !header) return;
      const sectionOffset = selectedSection.getBoundingClientRect().left;
      const headerOffset = header.getBoundingClientRect().left;
      const sectionWidth = parseFloat(getComputedStyle(selectedSection).getPropertyValue("width"));
      mover.style.setProperty("--header-selector-x-offset",`${sectionOffset - headerOffset + 15}px`);
      mover.style.setProperty("width", `${sectionWidth-30}px`);
    }; updateMoverPosition();

    const sectionClickHandle = (event: MouseEvent) => updateMoverPosition(event);
    headerSections.forEach(section => section.addEventListener("click", sectionClickHandle));
    const windowResizeHandle = () => { 
      if (window.innerHeight > 800) {
        if (windowIsSmall) updateMoverPosition();
        setWindowIsSmall(false);
      }
    }; window.addEventListener("resize", windowResizeHandle);
    return () => {
      headerSections.forEach(section => section.removeEventListener("click", sectionClickHandle));
      window.removeEventListener("resize", windowResizeHandle);
    }
  },[]);

  const headerRef = useRef<HTMLUListElement>(null);

  return ( <header id="header" className={styles.headerContainer}>
    
    <img src="/icons/header.svg" alt="fidelis-header-logo" className={styles.logo}/>
    
    <ul className={styles.header} ref={headerRef}>
      <li className={`${styles.headerElement} ${styles.firstHeaderElement}`}> {"главная"} </li>
      <li className={styles.headerElement}> {"о нас"} </li>
      <li className={styles.headerElement}> {"ассортимент"} </li>
      <li className={styles.headerElement}> {"контакты"} </li>
      <li className={`${styles.headerElement} ${styles.lastHeaderElement}`}> <p className={styles.lastHeaderElementContent}>{"связаться"}</p>
      <img src="/icons/arrow-right.svg" alt="contact-us-icon" className={styles.contactUsIcon}/> </li>
      <div className={styles.headerSelector}/>
    </ul>
  </header> )
}