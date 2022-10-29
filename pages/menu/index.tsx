import { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import { DiscountSlides, TabMenu } from '../../components/ui';
import { ProductCard, SearchNotFound, SearchProducts, TypesList } from '../../components/products';

import styles from '../../styles/Products.module.css';

interface Props {
   products: IProduct[];
}

// TODO: Hacer un refactor de la página
const ProductsPage: NextPage<Props> = ({ products }) => {
   const [searchTerm, setSearchTerm] = useState('');
   const [type, setType] = useState('');

   // without accented characters
   const searchProducts = products.filter((p) => {
      return p.name
         .toLowerCase()
         .normalize('NFD')
         .replace(/\p{Diacritic}/gu, '')
         .includes(searchTerm.toLowerCase());
   });

   const typeProducts = products.filter((p) => {
      return p.type === type;
   });

   const productsToShow =
      typeProducts.length > 0
         ? typeProducts
         : searchProducts.length > 0
         ? searchProducts
         : products;

   return (
      <ShopLayout title={''} pageDescription={''}>
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
