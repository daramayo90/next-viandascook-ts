import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './styles/Category.module.scss';
import { useRouter } from 'next/router';

interface CategoryProps {
   href: string;
   src: string;
   content: string;
}

export const Category: FC<CategoryProps> = ({ href, src, content }) => {
   const router = useRouter();
   const { pathname: page } = router;

   const variant = href === '/menu' ? styles.menu : styles.pack;
   const categoryStyle = page === '/menu' || page === '/packs' ? styles.menuCategory : '';
   const isDisabled = page === '/packs';

   const contentComponent = (
      <div
         className={`${styles.category} ${variant} ${categoryStyle} ${
            isDisabled ? styles.disabled : ''
         }`}>
         <Image src={src} alt='user' width={140} height={120} />
         <p className={`${styles.content}`}>{content}</p>
      </div>
   );

   return isDisabled ? contentComponent : <Link href={href}>{contentComponent}</Link>;
};
