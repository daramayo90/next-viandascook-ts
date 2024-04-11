import { useContext, useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { CartList, CrossSelling, OrderSummary } from '../../components/cart';

import { dbProducts } from '../../database';
import { ICartProduct, IProduct } from '../../interfaces';

import styles from '../../styles/Cart.module.css';

interface Props {
   products: IProduct[];
}

const CartPage: NextPage<Props> = ({ products }) => {
   const { isLoaded, cart, numberOfItems } = useContext(CartContext);
   const [showCrossSelling, setShowCrossSelling] = useState(false);
   const [hasAddedToCart, setHasAddedToCart] = useState(false);
   const router = useRouter();

   const isCrossSelling = (cart: ICartProduct[]) => {
      return cart.some((cartProduct) => cartProduct.type?.includes('Waffles'));
   };

   useEffect(() => {
      if (isLoaded && cart.length === 0) {
         router.replace('/cart/empty');
      }

      const hasAddedToCart = isCrossSelling(cart);
      setHasAddedToCart(hasAddedToCart);
   }, [isLoaded, cart, router]);

   useEffect(() => {
      const hasAddedToCart = isCrossSelling(cart);
      setShowCrossSelling(!hasAddedToCart);
   }, []);

   // Avoid render anything in client-side
   if (!isLoaded || cart.length === 0) {
      return <></>;
   }

   return (
      <ShopLayout title={`Carrito - ${numberOfItems}`} pageDescription={'Carrito'} noIndex>
         <section className={styles.cart}>
            <div className={styles.container}>
               <CartList editable />

               <OrderSummary />

               {showCrossSelling && (
                  <CrossSelling products={products} hasAddedToCart={hasAddedToCart} />
               )}
            </div>
         </section>
      </ShopLayout>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getCrossSellingProducts('Waffles');

   return {
      props: { products },
   };
};

export default CartPage;
