import { ChangeEvent, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { CartMenu } from '../../components/cart';
import { MenuLayout } from '../../components/layouts';
import { ProductCard } from '../../components/products';

import { BiSearchAlt } from 'react-icons/bi';

import styles from '../../styles/Products.module.css';
import { DiscountSlides } from '../../components/ui';

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   const [searchTerm, setSearchTerm] = useState('');

   const onSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   const filterProducts = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
   );

   const productsToShow = filterProducts.length > 0 ? filterProducts : products;

   return (
      <MenuLayout title={''} pageDescription={''}>
         <section className={styles.products}>
            <h1 className={styles.title}>Viandas a Domicilio</h1>

            <form className={styles.searchContainer}>
               <BiSearchAlt className={styles.icon} />
               <input
                  className={styles.search}
                  autoFocus
                  type='text'
                  name='query'
                  placeholder='Buscar...'
                  value={searchTerm}
                  onChange={onSearchTerm}
               />
            </form>

            <DiscountSlides />

            <article className={styles.container}>
               {productsToShow.map((product) => (
                  <ProductCard key={product._id} product={product} />
               ))}
            </article>
         </section>

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
