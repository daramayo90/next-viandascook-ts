import { FC } from 'react';
import Image from 'next/image';

import styles from '../../styles/Avatars.module.css';

interface Props {
   name: string;
   img: string;
   avatar: string;
   select: (avatar: string) => void;
}

export const Avatar: FC<Props> = ({ name, img, avatar, select }) => {
   const onClickAvatar = () => {
      select(img);
   };

   return (
      <div
         className={img === avatar ? `${styles.nextImage} selected` : `${styles.nextImage}`}
         onClick={onClickAvatar}>
         <Image src={img} alt={name} width={150} height={150} priority={true} />
      </div>
   );
};
