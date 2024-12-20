import Link from 'next/link';
import { FC } from 'react';

import { BiChevronRight } from 'react-icons/bi';

import styles from '../../styles/Button.module.css';

interface Props {
   href: string;
   content: string;
   color?: string;
   weight?: number;
   border?: string;
   background?: string;
   disabled?: boolean;
}

export const Button: FC<Props> = ({ href, content, color, weight, border, background, disabled }) => {
   const styleButton = {
      color,
      border,
      background,
   };

   const styleText = {
      color,
      fontWeight: weight,
   };

   const styleIcon = {
      color,
   };

   return (
      <Link href={href} passHref legacyBehavior prefetch={false}>
         <a className={styles.linkTo}>
            <button className={styles.linkButton} style={styleButton} disabled={disabled}>
               <span className={styles.text} style={styleText}>
                  {content}
               </span>
               <BiChevronRight className={styles.icon} style={styleIcon} />
            </button>
         </a>
      </Link>
   );
};
