import { Children, useEffect, useRef, useState } from "react";
import styles from "./effects.module.scss";

interface ProgressiveLayerBlurProps {
  width: number|string,
  height: number|string,
  blurDirection?: string,
}

export const ProgressiveLayerBlur: React.FC<ProgressiveLayerBlurProps>
= ({ width, height, blurDirection = "to bottom"}) => {

  const validDirectionList = [
    "to top", "to bottom", "to left", "to right",
    "to bottom right", "to bottom left",
    "to top right", "to top left"
  ];

  const getCssVariables = ()=> {
    return {
    '--progressiveBlur-layer-width': typeof width == "number"?`${width}px`:width,
    '--progressiveBlur-layer-height': typeof height == "number"?`${height}px`:height,
    '--progressiveBlur-blur-direction': validDirectionList.includes(blurDirection)?blurDirection:"to bottom",
    } as React.CSSProperties;
  }

  return ( <div className={styles.progressiveLayerBlur} style={getCssVariables()}>
    {Array(5).fill(null).map((_, index) => ( <div key={index} className={styles.blurLayer}/> ))}
  </div> )
}

export const SpawnAnimationWrapper: React.FC<{children: React.ReactElement}> = ({children}) => {
  const spawnerRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const spawner = spawnerRef.current;
    if (!spawnerRef || !spawner) return;
    const scrollCheck = () => {
      const bottomTrigger = window.innerHeight*0.8;
      const currentTop = spawner.getBoundingClientRect().top;
      if (currentTop < bottomTrigger) spawner.classList.add(styles.spawn);
    }
    scrollCheck(); window.addEventListener("scroll", scrollCheck);
    return () => window.removeEventListener("scroll", scrollCheck);
  },[]);
  return ( <div className={styles.spawnAnimationWrapper} ref={spawnerRef}>
    {children}
  </div> )
}