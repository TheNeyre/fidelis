import styles from "./component.module.scss";
import { useState, useEffect, useRef } from 'react';

export const DropdownSelectorInput: React.FC<{
  options: Array<string>,
  placeholder?: string,
  onSelect?: (item: string) => void | null,
}> = ({options, onSelect = null, placeholder = "Введите текст.."}) => {

  const [ items, setItems ] = useState<Array<string>>([]);
  const [ filteredItems, setFilteredItems ] = useState<Array<string>>([]);
  const [ inputValue, setInputValue ] = useState<string>("");
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ selectedItem, setSelectedItem ] = useState<string|null>(null);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const dropdownInputRef = useRef<HTMLInputElement>(null);

  /* INPUT CONTROL -> FILTRATION */
  useEffect(()=>{
    if (!inputValue.trim()) { setFilteredItems(items); return}
    const filtered = items.filter((item: string) => {
      return item.toLowerCase().includes(inputValue.toLowerCase());
    }); setFilteredItems(filtered);
  }, [inputValue, items])

  /* DEFAULT EVENTS CONTROL */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") setIsOpen(false);
    if (event.key === "Enter" && filteredItems.length === 1) handleItemSelect(filteredItems[0]);
  } 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { setInputValue(event.target.value); setIsOpen(true) }
  const handleItemSelect = (item: string) => {
    setSelectedItem(item); setInputValue(item);
    setIsOpen(false); if(onSelect) onSelect(item);
  }
  const resetSelectedItem = () => {
    setSelectedItem(null); setInputValue("");
    setIsOpen(false); if (onSelect) onSelect("");
  }

  return ( <div className="dropdownContainer" ref={dropdownContainerRef}>

    <input
    className={styles.dropdownInput}
    ref={dropdownInputRef}
    value={inputValue}
    type={"text"}
    onKeyDown={handleKeyDown}
    onChange={handleInputChange}
    onFocus={()=>setIsOpen(true)}
    />

    { isOpen && ( <div className={styles.dropdown}>
      
      {isLoading && ( <div className={styles.loading}>{"Загрузка.."}</div> )}
      {isError && ( <div className={styles.error}>{"Ошибка загрузки"}</div> )}
      {!isError && !isLoading && filteredItems.length === 0 && ( <div className={styles.empty}>{"Нет данных."}</div> )}
      {!isError && !isLoading && filteredItems.length > 0 && ( <ul className={styles.dropdownList}>
        <li className={`${styles.dropdownItem} ${styles.dropdownResetItem}`}>{"Сбросить"}</li>
        {filteredItems.map((item, index) => { return ( <li
            key={index}
            className={`${styles.dropdownItem} ${selectedItem&&selectedItem==item?styles.selectedItem:""}`}
            onClick={()=>handleItemSelect(item)}>
            {item} </li>
        )})}
      </ul> )}

    </div> ) }

  </div> )
}

// export const DropdownSelectorButton: React.FC<{
//   onSelect?: () => void | null
// }> = ({onSelect = null}) => {
//   return ( <div>

//   </div> )
// }