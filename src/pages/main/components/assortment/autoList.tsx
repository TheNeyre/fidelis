import styles from "./component.module.scss";
import { useState, useEffect } from "react";
import { Car } from "./interfaces";

export const AutoList: React.FC<{
  list: Array<Car>,
  isError: boolean,
  isLoading: boolean
  }> = ({list, isError, isLoading}) => {

  const [carList, setCarList] = useState<Array<Car>|null>(null);
  useEffect(() => setCarList(list) , [list]);

  const AutomodileCard: React.FC<{data: Car}> = ({data}) => ( <div className={styles.automodileCard}>
    {" i' m   t i r e d "}
  </div> );

  return ( <div className={styles.autoListContainer}>
    { isError && ( <div className={styles.error}> {"Возникла ошибка при загрузке"} </div> )}
    { isLoading && ( <div className={styles.loading}> {"Загрузка"} </div> ) }
    { !isError && !isLoading && carList && carList
    .map((carData, index) => (<AutomodileCard data={carData} key={`auto-${index}`}/>)) }
  </div> )
}