import { useState, FC } from 'react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import styles from './styles/Accordion.module.scss';

interface Props {
   title: string;
   content: string;
   questionPage?: boolean;
}

export const Accordion: FC<Props> = ({ title, content, questionPage }) => {
   const [isActive, setIsActive] = useState(false);

   return (
      <div className={`fadeIn ${styles.box}`}>
         <div className={styles.container} onClick={() => setIsActive(!isActive)}>
            {questionPage ? (
               <h2 className={styles.question}>{title}</h2>
            ) : (
               <h3 className={styles.question}>{title}</h3>
            )}
            {isActive ? (
               <FaChevronUp className={styles.arrow} />
            ) : (
               <FaChevronDown className={styles.arrow} />
            )}
         </div>
         {isActive && <p className={`fadeIn ${styles.content}`}>{content}</p>}
      </div>
   );
};
