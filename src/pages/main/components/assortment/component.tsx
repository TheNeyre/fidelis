import styles from "./component.module.scss"
import { useEffect, useState, useCallback } from "react";
import { SpawnAnimationWrapper } from "../../../common/effects/component";
import { AutoList } from "./autoList";
import { SearchFilters } from "./filters";
import { Car } from "./interfaces";
export default function SearchAssortment () {
  const [ upload, setUpload ] = useState<Car[]|null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ brand, setBrand ] = useState<string|null>(null);
  const [ model, setModel ] = useState<string|null>(null);
  const [ hasMileage, setHasMileage ] = useState<boolean>(false);
  const [ filteredAutoList, setfilteredAutoList ] = useState<Car[]|null>(null);

  const uploadFromDatabase = useCallback(async () => {
    setIsLoading(true);
    const carFilters = { "brand": brand, "model": model,"hasMileage": hasMileage }
    const linkParams = new URLSearchParams();
    for (const [filter, value] of Object.entries(carFilters)) {
      if ( value ) linkParams.append(filter, typeof value == "boolean"?"":value);
    };
    const params = linkParams.toString();
    try {
      const response = await fetch(params?`/api/cars/?${params}`:`/api/cars`);
      if (!response.ok) {setIsError(true);return}
      else setIsError(false);
      const newUpload = await response.json();
      setUpload(newUpload);
    } catch (error) { setIsError(true); console.error("Failed to upload auto-list") }
    finally { setTimeout(()=>{setIsLoading(false)}, 1000) }
  }, [brand, model, hasMileage]);
  useEffect(() => {uploadFromDatabase()}, [uploadFromDatabase]);

  useEffect(() => {
    if (!brand && !model && !hasMileage) setfilteredAutoList(upload);

  }, [upload])

  return ( <div className={styles.searchAssortmentContainer}>
    <SpawnAnimationWrapper><div className={styles.searchAssortmentTitle}>{"Подберите себе автомобиль"}</div></SpawnAnimationWrapper>
    <SpawnAnimationWrapper>
      <SearchFilters
      brandList={[]}
      modelList={[]}
      onBrandSelect={(i)=>setBrand(i)}
      onModelSelect={(i)=>setModel(i)}
      onSetHasMileage={(i)=>setHasMileage(i)}
      isError={isError} isLoading={isLoading}
      />
      {/* <AutoList
      list={upload?upload:[]}
      isError={isError}
      isLoading={isLoading}
      /> */}
    </SpawnAnimationWrapper>

  </div> )
}