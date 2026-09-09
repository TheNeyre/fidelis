import Header from "../common/header/component";
import styles from "./page.module.scss";
import BitrixForm from "./components/form/component";
import CompanyInformation from "./components/information/component";
import SearchAssortment from "./components/search/component";
import TeamList from "./components/team/component";

export default function MainPage () {
  return (<>
    <Header/>

    <div className={styles.background}>
      <img src="/imgs/background.png" alt="background" 
      className={styles.backgroundImage}/>
    </div>

  </>)
}