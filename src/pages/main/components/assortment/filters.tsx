import styles from "./component.module.scss";
import { useState, useEffect, useRef } from "react";
import { DropdownSelectorInput } from "../../../common/dropdowns/component";
import { Car } from "./interfaces";
export const SearchFilters: React.FC<{
  list: Array<Car>,
  onSetHasMileage: (hasMileage: boolean) => void | null,
  onBrandSelect: (brand: string) => void | null,
  onModelSelect: (model: string) => void | null,
}> = ({list, onSetHasMileage = null, onBrandSelect = null, onModelSelect = null}) => {



  return ( <div className={styles.searchFiltresContainer}>

    <div className={styles.filterMileage}>
      <button className={styles.filterMileageButton}>{"Новые"}</button>
      <button className={styles.filterMileageButton}>{"С пробегов"}</button>
      <div className={styles.filterMileageMover}/>
    </div>

  </div> )
}