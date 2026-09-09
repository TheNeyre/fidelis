import Header from "../common/header/component";

import styles from "./page.module.scss";

import { ProgressiveLayerBlur } from "../common/effects/component";
import { useEffect, useRef } from "react";

import BitrixForm from "./components/form/component";
import CompanyInformation from "./components/information/component";
import SearchAssortment from "./components/search/component";
import TeamList from "./components/team/component";

export default function MainPage () {

  const backgroundImageRef =  useRef<HTMLImageElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const windowResizeHandle = () => {
    const coefficient = (window.innerWidth/2000) - .15;
    Object.assign(document.documentElement,
    {style: `--background-height-coefficient: ${coefficient};`});}
    windowResizeHandle();
    window.addEventListener("resize", windowResizeHandle);
    return () => window.removeEventListener("resize", windowResizeHandle);
  }, []);

  return (<>

    <div className={styles.headerPositionFix}>
      <Header/>
    </div>
    

    <div className={styles.background}>
      <img src="/imgs/background.png" alt="background" 
      className={`${styles.backgroundImage} ${styles.backgroundLayer}`} ref={backgroundImageRef}/>
      <div className={`${styles.backgroundColorGradient} ${styles.backgroundLayer}`}></div>
      <div className={`${styles.backgroundLayer} ${styles.backgroundBlur}`}>
        <ProgressiveLayerBlur
        parentRef={backgroundImageRef}
        blurDirection = {"to bottom"}
        />
      </div>
    </div>
    
    <div className="test" ref={testRef}>
      <div className="blur">
        <ProgressiveLayerBlur
        parentRef={testRef}
        blurDirection = {"to bottom"}
        />
      </div>
    </div>

  </>)
}