import styles from '../../styles/LoadingBars.module.css';

export const LoadingBars = () => {
   return (
      <div className={styles.loadingContainer}>
         <div className={styles.loadingBars}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
         </div>
      </div>
   );
};
