import styles from './styles/Loyalty.module.scss';

export const Discount = () => {
   return (
      <div className={styles.discount}>
         <div className={styles.container}>
            <div className={styles.info}>
               <p className={styles.text}>Disfrutá este descuento:</p>
               <p className={styles.text}>
                  <span>10%</span>
                  <span>off</span>
               </p>
               <p className={styles.text}>En tu primera compra</p>
            </div>
         </div>
      </div>
   );
};
