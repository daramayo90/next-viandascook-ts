import { FC } from 'react';

import { BiChevronRight } from 'react-icons/bi';

import styles from '../../styles/Button.module.css';

interface Props {
   content: string;
   color?: string;
   border?: string;
   background?: string;
}

export const SubmitButton: FC<Props> = ({ content, color, border, background }) => {
   const styleButton = {
      color,
      border,
      background,
   };

   const styleIcon = {
      color,
   };

   return (
      <div className={styles.linkTo}>
         <button className={styles.linkButton} style={styleButton} type='submit'>
            {content}
            <BiChevronRight className={styles.icon} style={styleIcon} />
         </button>
      </div>
   );
};
