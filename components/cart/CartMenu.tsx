import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ItemCounter } from '../products';
import { ICartProduct } from '../../interfaces';

import { CartContext } from '../../context';

import { IoIosClose } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { MdKeyboardArrowUp } from 'react-icons/md';

import styles from '../../styles/CartMenu.module.css';
import { currency } from '../../utils';

export const CartMenu = () => {
   const { numberOfItems, cart, updateCartQuantity, removeCartProduct, total } =
      useContext(CartContext);
   const [touched, setTouched] = useState(false);

   const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
      product.quantity = newQuantityValue;
      updateCartQuantity(product);
   };

   const onRemoveProduct = (product: ICartProduct) => {
      removeCartProduct(product);
   };

   return (
      <>
         <div
            className={touched ? `${styles.cartMenu}` : `${styles.cartMenu} hide`}
            onClick={() => setTouched(!touched)}>
            <div className={styles.container}>
               <span className={styles.quantity}>
                  {numberOfItems > 1 ? `${numberOfItems} viandas` : `${numberOfItems} vianda`}
               </span>

               <div className={styles.info}>
                  <span className={styles.total}>{currency.format(total)}</span>
                  <span className={styles.details}>Ver el Detalle</span>
                  <MdKeyboardArrowUp className={styles.iconDetails} />
               </div>
            </div>
         </div>

         <div className={styles.desktop}>
            <div className={styles.cart} onClick={() => setTouched(!touched)}>
               <FaShoppingCart className={styles.icon} />
               <span className={styles.quantity}>{numberOfItems}</span>
            </div>
         </div>

         {touched && (
            <div className={styles.fullMenu}>
               <div className={styles.top}>
                  <div className={styles.title}>
                     <h4>Platos elegidos</h4>
                  </div>

                  <div className={styles.closeMenu} onClick={() => setTouched(!touched)}>
                     <IoIosClose className={styles.icon} />
                  </div>
               </div>

               {/* TODO: Agregar los platos con fondo .png */}
               <div className={styles.selectedMeals}>
                  {cart.map((product) => (
                     <div key={product._id} className={styles.mealRow}>
                        <div className={styles.meal}>
                           <div className={styles.nextImage}>
                              <Image
                                 src={`/products/${product.image}`}
                                 alt={product.name}
                                 width={100}
                                 height={80}
                              />
                           </div>
                           <span className={styles.name}>{product.name}</span>
                        </div>

                        <ItemCounter
                           color='var(--white)'
                           currentValue={product.quantity}
                           updatedQuantity={(newValue) =>
                              onNewCartQuantityValue(product as ICartProduct, newValue)
                           }
                        />

                        <button
                           className={styles.removeButton}
                           onClick={() => onRemoveProduct(product as ICartProduct)}>
                           Remover
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </>
   );
};
