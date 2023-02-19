import styles from '../../styles/HowItWorks.module.css';
import { FC } from 'react';

interface Props {
   id: number;
   poster: string;
   source: string;
   title: string;
   text1: string;
   text2: string;
}

export const Step: FC<Props> = ({ id, poster, source, title, text1, text2 }) => {
   return (
      <div className={id % 2 === 0 ? `${styles.step}` : `${styles.step} ${styles.stepReverse}`}>
         <div className={styles.video}>
            <video autoPlay muted loop playsInline poster={poster}>
               <source src={source} type='video/mp4' />
            </video>
         </div>
         <div className={styles.text}>
            <h3>{title}</h3>
            <p>{text1}</p>
            <p>{text2}</p>
         </div>
      </div>
   );
};
