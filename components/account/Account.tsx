import { FC, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { IUser } from '../../interfaces';

import { AiFillEdit } from 'react-icons/ai';

import styles from '../../styles/Account.module.css';

interface Props {
   user: IUser;
}

export const Account: FC<Props> = ({ user }) => {
   const { avatar } = user;

   return (
      <div className={styles.account}>
         <Link href='/mi-cuenta/avatars'>
            <div className={styles.nextImage}>
               <Image
                  src={avatar ? avatar : `/avatars/VC-Avatars-00.png`}
                  alt='avatar'
                  width={90}
                  height={90}
               />
            </div>
         </Link>

         <div className={styles.info}>
            <div className={styles.name}>
               <span>
                  {user.name} {user.lastName}
               </span>
            </div>
            <div className={styles.email}>
               <span>{user.email}</span>
            </div>
         </div>

         <Link href='/mi-cuenta/perfil'>
            <a>
               <AiFillEdit className={styles.editIcon} />
            </a>
         </Link>
      </div>
   );
};
