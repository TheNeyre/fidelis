import styles from "./component.module.scss";

interface FooterElement {
  icon: string | null,
  title: string,
  link: string | null,
}

export default function Footer () {

  const FOOTER_CONTENT: {[key: string]: FooterElement[]} = {
    "Контакты": [
      {
        icon: "telegram",
        title: "Телеграм",
        link: "https://t.me/fidelis_auto"
      },
      {
        icon: "instagram",
        title: "Инстаграм",
        link: "https://www.instagram.com/_fidelis_group?igsh=MTlpNGVicG4wMWJucQ%3D%3D&utm_source=qr",
      },
      {
        icon: "vk",
        title: "ВК",
        link: "https://vk.ru/club238468927"
      }
    ],
    "Прямая связь": [
      {
        icon: "email",
        title: "info@fidelis-group.ru",
        link: null,
      },
      {
        icon: "call",
        title: "8 (800) 777-60-54",
        link: null,
      },
    ],
    "Данные компании": [
      {
        icon: null,
        title: "ИНН: 5507307581",
        link: null, 
      },
      {
        icon: null,
        title: "КПП: 550701001",
        link: null, 
      },
    ],
    "Адреса автосалонов": [
      {
        icon: "map",
        title: "644015, Омская область, г. Омск, ул. 22 декабря, д.89",
        link: null,
      }
    ]
  }

  return ( <footer id="footer" className={styles.footerContainer}>

    {Object.entries(FOOTER_CONTENT).map(([sectionTitle, sectionContent]) => (
      <div className={styles.footerSection}>
        <h4 className={styles.sectionTitle}>{sectionTitle}</h4>
        <ul className={styles.sectionElements}>
          {sectionContent.map((footerElement, index) => (
            <li key={index} className={styles.sectionElement}>
              { footerElement.icon && ( <img src={`/icons/${footerElement.icon}.svg`} alt={`footer-element-${index}`} className={styles.elementIcon}/> ) }
              { footerElement.link?( <a href={footerElement.link} target="_blank" rel="noopener noreferrer" className={styles.elementText}>
                {footerElement.title}
              </a> ):( <span className={styles.elementText}>
                {footerElement.title}
              </span> ) }
            </li>
          ))}
        </ul>
      </div>
    ))}

  </footer> )
}