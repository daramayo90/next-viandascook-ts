import Image from 'next/image';
import { howItWorks } from '../../../utils';
import styles from '../../../styles/loyalty/Loyalty.module.scss';

export const HowItWorks = () => {
   return (
      <div className={styles.howItWorks}>
         <h3 className={styles.title}>¿Cómo funciona?</h3>
         <div className={styles.container}>
            {howItWorks.map((card) => (
               <div key={card.alt} className={styles.box}>
                  <div className={styles.icon}>
                     <Image src={card.icon} alt={card.alt} width={100} height={100} priority={true} />
                  </div>
                  <p className={styles.lead}>{card.lead}</p>
                  <p className={styles.text}>{card.text}</p>
               </div>
            ))}
         </div>
      </div>
   );
};
