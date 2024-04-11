import { FC, useEffect, useState } from 'react';
import { IProduct } from '../../interfaces';
import { CrossSellingProduct } from './CrossSellingProduct';

import styles from '../../styles/CrossSelling.module.css';

interface Props {
   products: IProduct[];
   hasAddedToCart: boolean;
}

export const CrossSelling: FC<Props> = ({ products, hasAddedToCart }) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const isCrossSellingShown = localStorage.getItem('isCrossSellingShown');
      if (isCrossSellingShown !== 'true') {
         setIsVisible(true);
      }
   }, []);

   const handleClose = () => {
      localStorage.setItem('isCrossSellingShown', 'true');
      setIsVisible(false);
   };

   if (!isVisible) return null;

   return (
      <div className={`${styles.crossSelling} ${isVisible ? styles.show : ''}`}>
         <div className={styles.container}>
            <h3 className={styles.title}>
               Sumá <strong>Waffles</strong>
            </h3>
            <p className={styles.text}>para tus desayunos y meriendas</p>

            <div className={styles.products}>
               {products.map((product) => (
                  <CrossSellingProduct key={product._id} product={product} />
               ))}
            </div>

            <p className={styles.close} onClick={handleClose}>
               {!hasAddedToCart ? 'No, gracias' : 'Ver Carrito'}
            </p>
         </div>
      </div>
   );
};
