import Link from 'next/link';
import { FC } from 'react';

import { BiChevronRight } from 'react-icons/bi';

import styles from '../../styles/Button.module.css';

interface Props {
   href: string;
   content: string;
   color?: string;
   border?: string;
   background?: string;
   disabled?: boolean;
}

export const Button: FC<Props> = ({ href, content, color, border, background, disabled }) => {
   const styleButton = {
      color,
      border,
      background,
   };

   const styleIcon = {
      color,
   };

   return (
      <Link href={href}>
         <div className={styles.linkTo}>
            <button className={styles.linkButton} style={styleButton} disabled={disabled}>
               {content}
               <BiChevronRight className={styles.icon} style={styleIcon} />
            </button>
         </div>
      </Link>
   );
};
