import { useState, useContext, useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { CartContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import { Button, DiscountSlides, News } from '../../components/ui';
import { ProductCard, SearchNotFound, SearchProducts, TypesList } from '../../components/products';

import { seo } from '../../utils';

import styles from '../../styles/Products.module.css';

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   const { title, description, keywords, canonical } = seo['ProductsPage'];

   const router = useRouter();

   const [searchTerm, setSearchTerm] = useState<string>('');
   const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

   const [type, setType] = useState<string>('');
   const [typeProducts, setTypeProducts] = useState<IProduct[]>([]);

   const [queryType, setQueryType] = useState<string>('');

   const { numberOfItems } = useContext(CartContext);

   useEffect(() => {
      console.log(router.query.type);
      if (router.query.type) {
         setQueryType(router.query.type as string);
      } else {
         setQueryType('');
      }
   }, [router.query]);

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

      if (searchTerm) {
         setQueryType('');
      }
   }, [products, searchTerm]);

   useEffect(() => {
      const typeProducts: IProduct[] = products.filter((p) => {
         return p.type.some((t) => type.includes(t) || queryType.includes(t));
      });
      setTypeProducts(typeProducts);

      if (type) {
         setQueryType('');
      }
   }, [products, type, queryType]);

   const productsToShow =
      typeProducts.length > 0 || queryType !== ''
         ? typeProducts
         : searchProducts.length > 0
         ? searchProducts
         : products;

   return (
      <ShopLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.products}>
            {/* <News /> */}

            <SearchProducts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {!searchTerm && (
               <>
                  <DiscountSlides />

                  <TypesList type={type} setType={setType} />
               </>
            )}

            <article className={styles.container}>
               {!searchTerm || (searchTerm && searchProducts!.length > 0) ? (
                  productsToShow!.map((product) => <ProductCard key={product._id} product={product} />)
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
