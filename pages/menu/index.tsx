import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { CartMenu } from '../../components/cart';
import { MenuLayout } from '../../components/layouts';
import { DiscountSlides } from '../../components/ui';
import { ProductCard, SearchNotFound, TypesList } from '../../components/products';

import { BiSearchAlt } from 'react-icons/bi';

import styles from '../../styles/Products.module.css';

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   const inputRef = useRef<HTMLInputElement | null>(null);

   const [searchTerm, setSearchTerm] = useState('');
   const [type, setType] = useState('');

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      inputRef.current!.value = '';
   };

   const onSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   const searchProducts = products.filter((p) => {
      return p.name.toLowerCase().includes(searchTerm.toLowerCase());
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
      <MenuLayout title={''} pageDescription={''}>
         <section className={styles.products}>
            <form className={styles.searchContainer} onSubmit={handleSubmit}>
               <BiSearchAlt className={styles.icon} />
               <input
                  ref={inputRef}
                  className={styles.search}
                  autoFocus
                  type='text'
                  name='query'
                  placeholder='Buscar...'
                  value={searchTerm}
                  onChange={onSearchTerm}
                  onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm : null)}
               />
            </form>

            {!searchTerm && (
               <>
                  <DiscountSlides />

                  <TypesList type={type} setType={setType} />
               </>
            )}

            <article className={styles.container}>
               {!searchTerm || (searchTerm && searchProducts.length > 0) ? (
                  productsToShow.map((product) => (
                     <ProductCard key={product._id} product={product} />
                  ))
               ) : (
                  <SearchNotFound />
               )}
            </article>
         </section>

         {/* <h1 className={styles.title}>Viandas a Domicilio</h1> */}
         {/* <CartMenu /> */}
      </MenuLayout>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getAllProducts();

   return {
      props: { products },
   };
};

export default ProductsPage;
