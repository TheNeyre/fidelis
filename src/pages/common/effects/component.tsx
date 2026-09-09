import { useEffect, useRef, useState } from "react";
import styles from "./effects.module.scss";

interface ProgressiveLayerBlurProps {
  parentRef: React.RefObject<HTMLElement|HTMLDivElement|HTMLImageElement|null>,
  blurDirection?: string,
}

export const ProgressiveLayerBlur: React.FC<ProgressiveLayerBlurProps>
= ({ parentRef, blurDirection = "to bottom"}) => {

  const [parentSize, setParentSize] = useState<DOMRect|null>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const parentEl = parentRef.current;
    if (!parentEl) return;
    const updateSize = () => setParentSize(parentEl.getBoundingClientRect());
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(parentEl);
    return () => resizeObserver.disconnect();
  }, [parentRef])

  const validDirectionList = [
    "to top", "to bottom", "to left", "to right",
    "to bottom right", "to bottom left",
    "to top right", "to top left"
  ];

  const getCssVariables = ()=> {
    return {
    '--progressiveBlur-layer-width': `${parentSize?parentSize.width*2:0}px`,//typeof width === 'number' ? `${width}px` : width,
    '--progressiveBlur-layer-height': `${parentSize?parentSize.height*2:0}px`,//typeof height === 'number' ? `${height}px` : height,
    '--progressiveBlur-blur-direction': validDirectionList.includes(blurDirection)?blurDirection:"to bottom",
    '--progressiveBlur-layer-y-offset': `${parentSize?parentSize.height*-.5:0}px`,
    '--progressiveBlur-layer-x-offset': `${parentSize?parentSize.width*-.5:0}px`,
    } as React.CSSProperties;
  }

  return ( <div className={styles.progressiveLayerBlur} style={getCssVariables()} ref={currentRef}>
    {Array(5).fill(null).map((_, index) => ( <div key={index} className={styles.blurLayer}/> ))}
  </div> )
}