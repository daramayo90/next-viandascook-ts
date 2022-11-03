import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context';
import { ICartProduct, IProduct } from '../interfaces';

export const useTempCart = (product: IProduct) => {
   const { cart, addProductToCart, updateCartQuantity, removeCartProduct } =
      useContext(CartContext);

   const [isSelecting, setIsSelecting] = useState(false);

   // TODO: Ver por qué no funciona el 'setTempCartProduct'
   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      image: product.image,
      name: product.name,
      // slug: product.slug,
      price: product.price,
      type: product.type,
      quantity: 0,
   });

   // Add new product to cart, else update product cart quantity
   const onNewCartQuantityValue = (product: ICartProduct, quantity: number) => {
      if (!product) {
         tempCartProduct.quantity = quantity;
         addProductToCart(tempCartProduct);
      } else {
         product.quantity = quantity;
         updateCartQuantity(product);
      }

      if (product && product.quantity === 0) {
         removeCartProduct(product);
      }
   };

   const startSelecting = (product: ICartProduct) => {
      setIsSelecting(true);
      onNewCartQuantityValue(product, 1);
   };

   useEffect(() => {
      const interval = setInterval(() => setIsSelecting(false), 4500);

      return () => clearInterval(interval);
   }, [cart]);

   const cartProduct = cart.find((p) => product._id === p._id);

   return {
      cartProduct,
      tempCartProduct,
      isSelecting,
      setIsSelecting,
      onNewCartQuantityValue,
      startSelecting,
   };
};
