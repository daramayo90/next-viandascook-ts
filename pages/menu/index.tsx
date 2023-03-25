import { useState, useContext, useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { CartContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import { Button, DiscountSlides } from '../../components/ui';
import { ProductCard, SearchNotFound, SearchProducts, TypesList } from '../../components/products';

import styles from '../../styles/Products.module.css';

interface Props {
   products: IProduct[];
}

// TODO: Hacer un refactor de la página
const ProductsPage: NextPage<Props> = ({ products }) => {
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

   const [type, setType] = useState<string>('');
   const [typeProducts, setTypeProducts] = useState<IProduct[]>([]);

   const { numberOfItems } = useContext(CartContext);

   useEffect(() => {
      const searchProducts: IProduct[] = products.filter((p) => {
         return (
            p.ingredients.some((ing) => ing.toLowerCase().includes(searchTerm.toLowerCase())) ||
            p.type.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
            p.name
               .toLowerCase()
               .normalize('NFD')
               .replace(/\p{Diacritic}/gu, '')
               .includes(searchTerm.toLowerCase())
         );
      });
      setSearchProducts(searchProducts);
      setType('');
   }, [products, searchTerm]);

   useEffect(() => {
      const typeProducts: IProduct[] = products.filter((p) => {
         return p.type.some((t) => type.includes(t));
      });
      setTypeProducts(typeProducts);
   }, [products, type]);

   const productsToShow =
      typeProducts.length > 0
         ? typeProducts
         : searchProducts.length > 0
         ? searchProducts
         : products;

   return (
      <ShopLayout title={'Viandas Cook - Menú'} pageDescription={''}>
         <section className={styles.products}>
            <SearchProducts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {!searchTerm && (
               <>
                  <DiscountSlides />

                  <TypesList type={type} setType={setType} />
               </>
            )}

            <article className={styles.container}>
               {!searchTerm || (searchTerm && searchProducts!.length > 0) ? (
                  productsToShow!.map((product) => (
                     <ProductCard key={product._id} product={product} />
                  ))
               ) : (
                  <SearchNotFound />
               )}
            </article>

            {numberOfItems > 0 && (
               <div className={styles.goToCartBtn}>
                  <Button
                     href={'/cart'}
                     content={'Ver Carrito'}
                     background='var(--primary)'
                     border='none'
                  />
               </div>
            )}
         </section>
      </ShopLayout>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getAllProducts();

   return {
      props: { products },
   };
};

export default ProductsPage;
