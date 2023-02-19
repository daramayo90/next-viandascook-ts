import { FC } from 'react';
import Image from 'next/image';

import styles from '../../styles/Nosotros.module.css';

interface Props {
   id: number;
   poster: string;
   title: string;
   text: string;
}

export const SectionUs: FC<Props> = ({ id, poster, title, text }) => {
   return (
      <div className={id % 2 === 0 ? `${styles.sect}` : `${styles.sect} ${styles.sectReverse}`}>
         <div className={styles.nextImage}>
            <Image src={poster} alt='' width={500} height={300} priority={true} />
         </div>
         <div className={styles.text}>
            <h3>{title}</h3>
            <p>{text}</p>
         </div>
      </div>
   );
};
