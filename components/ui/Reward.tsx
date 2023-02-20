import styles from '../../styles/Loyalty.module.css';
import { FC } from 'react';
import Image from 'next/image';

interface Props {
   img: string;
   title: string;
   text: string;
}

export const Reward: FC<Props> = ({ img, title, text }) => {
   return (
      <div className={styles.reward}>
         <div className={styles.nextImage}>
            <Image src={img} alt='' width={80} height={80} priority={true} />
         </div>
         <h3 className={styles.title}>{title}</h3>
         <p className={styles.text}>{text}</p>
      </div>
   );
};
