import { FC, useContext, useEffect, useState } from 'react';
import { CrossSellingProduct } from './CrossSellingProduct';
import { CartContext } from '../../context';

import { IProduct } from '../../interfaces';

import styles from '../../styles/CrossSelling.module.css';

interface Props {
   products: IProduct[];
}

export const CrossSelling: FC<Props> = ({ products }) => {
   const [isVisible, setIsVisible] = useState(false);
   const [hasCrossSellingAdded, setHasCrossSellingAdded] = useState(false);
   const { cart } = useContext(CartContext);

   useEffect(() => {
      const isCrossSellingShown = localStorage.getItem('isCrossSellingShown');
      if (isCrossSellingShown !== 'true') {
         setIsVisible(true);
      }
   }, []);

   useEffect(() => {
      const hasAddedToCart = cart.some((cartProduct) => cartProduct.type?.includes('Budines'));
      setHasCrossSellingAdded(hasAddedToCart);
   }, [cart]);

   const handleClose = () => {
      localStorage.setItem('isCrossSellingShown', 'true');
      setIsVisible(false);
   };

   if (!isVisible) return null;

   return (
      <div className={`${styles.crossSelling}`}>
         <div className={styles.container}>
            <h3 className={styles.title}>
               Sumá este exquisito <strong>Budín Integral</strong>
            </h3>
            <p className={styles.text}>para tus desayunos y meriendas</p>

            <div className={styles.products}>
               {products.map((product) => (
                  <CrossSellingProduct key={product._id} product={product} />
               ))}
            </div>

            <p className={styles.close} onClick={handleClose}>
               {!hasCrossSellingAdded ? 'No, gracias' : 'Ver Carrito'}
            </p>
         </div>
      </div>
   );
};
