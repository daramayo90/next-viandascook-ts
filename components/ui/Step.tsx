import Image from 'next/image';
import styles from '../../styles/HowItWorks.module.css';
import { FC } from 'react';

interface Props {
   id: number;
   poster: string;
   title: string;
   text1: string;
   text2: string;
}

export const Step: FC<Props> = ({ id, poster, title, text1, text2 }) => {
   return (
      <div className={id % 2 === 0 ? `${styles.step}` : `${styles.step} ${styles.stepReverse}`}>
         <div className={styles.video}>
            <Image src={poster} alt={title} layout='fill' objectFit='cover' priority={true} />
         </div>
         <div className={styles.text}>
            <h2>{title}</h2>
            <p>{text1}</p>
            <p>{text2}</p>
         </div>
      </div>
   );
};
