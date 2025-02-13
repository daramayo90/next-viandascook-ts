import { FC } from 'react';

import { ClipLoader } from 'react-spinners';

import styles from '../../styles/SubmitButton.module.css';

interface Props {
   content: string;
   isClicked?: boolean;
   onClick?: () => void;
   onAsyncClick?: () => Promise<void>;
}

export const SubmitButton: FC<Props> = ({ content, isClicked, onClick }) => {
   return (
      <div className={styles.linkTo}>
         <button className={styles.btn} type='submit' disabled={isClicked} onClick={onClick}>
            {isClicked && <ClipLoader className={styles.load} color={'var(--white)'} size={20} />}
            {content}
         </button>
      </div>
   );
};
