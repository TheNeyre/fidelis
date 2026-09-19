import styles from "./component.module.scss"
import { useState } from 'react';
export default function BitrixForm () {

  const [ formStatus, setFormStatus ] = useState<string>("default");
  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("loading");
    const formData = new FormData(event.target);
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    if (!email || !phone || !name) { setFormStatus("not-full-data"); return }
    if (email && !email.includes(".") && !email.includes("@") && !(email.length >= 5)) { setFormStatus("incorrect-data"); return}
    if (phone && !(phone.length>10)) { setFormStatus("incorrect-data"); return }
  }

  const formStatusTextTemplates: { [key: string]: string } = {
    "default": "Введите свои данные для связи",
    "incorrect-data": "Вы некорректно вели данные! Проверьте ещё раз!",
    "not-full-data": "Все поля обязательны для заполнения!",
    "button:loading": "Загрузка...",
    "button:success": "Успешно!",
    "button:default": "Отправить",
  }

  return ( <div className={styles.bitrixFormContainer}>

    <div className={styles.bitrixFormContainerContent}>
    <div className={styles.bitrixFormTitle}>
      Интересно? <br /> Отправьте нам свою заявку!
    </div>

    <form className={styles.bitrixForm} onSubmit={(e)=>handleFormSubmit(e)}>

      <div className={`${styles.formStatus} ${formStatus.includes("error")?styles.formStatusError:""}`}>
        {formStatusTextTemplates[formStatus]}
      </div>

      <div className={styles.formInputContainer}>
        <input type="text" name="name" className={styles.formInput}/>
        <div className={styles.additionText}>{"Как в вам обращаться?"}</div>
      </div>

      <div className={styles.formInputContainer}>
        <input type="text" name="email" className={styles.formInput}/>
        <div className={styles.additionText}>{"Ваша почта"}</div>
      </div>

      <div className={styles.formInputContainer}>
        <input type="text" name="phone" className={styles.formInput}/>
        <div className={styles.additionText}>{"Номер телефона"}</div>
      </div>

      <button className={styles.submitButton }>{formStatusTextTemplates[`button:${formStatus}`]}</button>
    </form>
    </div>




  </div> )
}