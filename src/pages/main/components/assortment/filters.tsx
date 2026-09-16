import styles from "./component.module.scss";
import { useState, useEffect, useRef } from "react";
import { DropdownSelectorInput } from "../../../common/dropdown/component";
import { Car } from "./interfaces";
export const SearchFilters: React.FC<{
  list: Array<Car>,
  onSetHasMileage: (hasMileage: boolean) => void | null,
  onBrandSelect: (brand: string) => void | null,
  onModelSelect: (model: string) => void | null,
}> = ({list, onSetHasMileage = null, onBrandSelect = null, onModelSelect = null}) => {

  const [ hasMileage, setHasMileage ] = useState<boolean>(false);

  useEffect(()=>{
    const selectors = Array.from(document.querySelectorAll<HTMLButtonElement>(`.${styles.filterMileageButton}`));
    const currentSelector = hasMileage?selectors[1]:selectors[0];
    const secondSelector = hasMileage?selectors[0]:selectors[1];
    const updateMoverPosition = () => {
      const mover = document.querySelector<HTMLDivElement>(`.${styles.filterMileageMoverContainer}`);
      const filters = document.querySelector<HTMLDivElement>(`.${styles.filterMileage}`);
      if (!mover || !currentSelector || !filters) return;
      const selectorWidth = parseFloat(getComputedStyle(currentSelector).getPropertyValue("width"));
      const selectorOffset = currentSelector.getBoundingClientRect().left;
      const filtersOffset = filters.getBoundingClientRect().left;
      mover.style.setProperty("width", `${selectorWidth}px`);
      mover.style.setProperty("--filter-mover-offset-x", `${selectorOffset - filtersOffset}px`);
    }; updateMoverPosition();
    currentSelector.classList.add(styles.selected);
    secondSelector.classList.remove(styles.selected);
  },[hasMileage]);

  return ( <div className={styles.searchFiltresContainer}>

    <div className={styles.filterMileage}>
      <div className={styles.filterMileageMoverContainer}><div className={styles.mover}></div></div>
      <button className={`${styles.filterMileageButton}`} onClick={()=>setHasMileage(false)}>{"Новые"}</button>
      <button className={`${styles.filterMileageButton}`} onClick={()=>setHasMileage(true)}>{"С пробегом"}</button>
    </div>

    <div className={styles.dropdownFilters}>
      
    </div>

  </div> )
}