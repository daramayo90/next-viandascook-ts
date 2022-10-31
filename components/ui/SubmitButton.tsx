import { FC } from 'react';

import { ClipLoader } from 'react-spinners';
import { BiChevronRight } from 'react-icons/bi';

import styles from '../../styles/SubmitButton.module.css';

interface Props {
   content: string;
   isClicked?: boolean;
}

export const SubmitButton: FC<Props> = ({ content, isClicked }) => {
   return (
      <div className={styles.linkTo}>
         <button className={styles.btn} type='submit' disabled={isClicked}>
            {isClicked && <ClipLoader className={styles.load} color={'var(--white)'} size={20} />}
            {content}
            <BiChevronRight className={styles.icon} />
         </button>
      </div>
   );
};
