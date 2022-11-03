import { FC } from 'react';
import Image from 'next/image';

import { IUser } from '../../interfaces';

import { AiFillEdit } from 'react-icons/ai';

import styles from '../../styles/Account.module.css';
import Link from 'next/link';

interface Props {
   user: IUser | undefined;
}

export const Account: FC<Props> = ({ user }) => {
   return (
      <Link href='/mi-cuenta/perfil'>
         <div className={styles.account}>
            <div className={styles.nextImage}>
               <Image src={`/profile/avatar.jpg`} alt='avatar' width={90} height={90} />
            </div>

            <div className={styles.info}>
               <span className={styles.name}>
                  {user!.name} {user!.lastName}
               </span>
               <span className={styles.phone}>+54 9 {user!.phone}</span>
            </div>

            <AiFillEdit className={styles.editIcon} />
         </div>
      </Link>
   );
};
