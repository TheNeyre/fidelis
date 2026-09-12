import { useEffect, useRef, useState } from "react";
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