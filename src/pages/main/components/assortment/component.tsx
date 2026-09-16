import styles from "./component.module.scss"
import { useEffect, useState, useCallback } from "react";
import { AutoList } from "./autoList";
import { SearchFilters } from "./filters";
import { Car } from "./interfaces";
export default function SearchAssortment () {
  const [ upload, setUpload ] = useState<Array<Car>|null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ brand, setBrand ] = useState<string|null>(null);
  const [ model, setModel ] = useState<string|null>(null);
  const [ hasMileage, setHasMileage ] = useState<boolean>(false);

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
  return ( <div className={styles.SearchAssortment}>
    <SearchFilters
    list={upload?upload:[]}
    onBrandSelect={(i)=>setBrand(i)}
    onModelSelect={(i)=>setModel(i)}
    onSetHasMileage={(i)=>setHasMileage(i)}
    />
    {/* <AutoList
    list={upload?upload:[]}
    isError={isError}
    isLoading={isLoading}
    /> */}
  </div> )
}