import Link from 'next/link';
import { FC } from 'react';

import { BiChevronRight } from 'react-icons/bi';

import styles from '../../styles/Button.module.css';

interface Props {
   href: string;
   content: string;
   color?: string;
   border?: string;
}

export const Button: FC<Props> = ({ href, content, color, border }) => {
   const styleButton = {
      color,
      border,
   };

   const styleIcon = {
      color,
   };

   return (
      <Link href={href}>
         <div className={styles.linkTo}>
            <button className={styles.linkButton} style={styleButton}>
               {content}
               <BiChevronRight className={styles.icon} style={styleIcon} />
            </button>
         </div>
      </Link>
   );
};
