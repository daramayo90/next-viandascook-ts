import Image from 'next/image';
import { AiFillEdit } from 'react-icons/ai';
import styles from '../../styles/Profile.module.css';

export const Account = () => (
   <div className={styles.account}>
      <div className={styles.nextImage}>
         <Image src={`/profile/avatar.jpg`} alt='avatar' width={90} height={90} />
      </div>

      <div className={styles.info}>
         <span className={styles.name}>Damián Aramayo</span>
         <span className={styles.phone}>+54 9 1136527688</span>
      </div>

      <AiFillEdit className={styles.editIcon} />
   </div>
);
