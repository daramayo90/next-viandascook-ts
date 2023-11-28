import { useState, FC } from 'react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import styles from '../../styles/Accordion.module.css';

interface Props {
   title: string;
   content: string;
}

export const Accordion: FC<Props> = ({ title, content }) => {
   const [isActive, setIsActive] = useState(false);

   return (
      <div className={`fadeIn ${styles.accordionItem}`}>
         <div className={styles.container} onClick={() => setIsActive(!isActive)}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.arrow}>{isActive ? <FaChevronUp /> : <FaChevronDown />}</span>
         </div>
         {isActive && <p className={`fadeIn ${styles.content}`}>{content}</p>}
      </div>
   );
};
