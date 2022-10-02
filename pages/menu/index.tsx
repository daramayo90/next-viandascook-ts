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
import { typesList } from '../../utils';
import Image from 'next/image';

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   const [searchTerm, setSearchTerm] = useState('');
   const [type, setType] = useState('');

   const onSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   const typeFilter = (type: string) => {
      setType(type);
   };

   const searchProducts = products.filter((p) => {
      p.name.toLowerCase().includes(searchTerm.toLowerCase());
   });

   const typeProducts = products.filter((p) => {
      p.type === type;
   });

   const productsToShow = searchProducts.length > 0 ? searchProducts : products;

   console.log(type);

   return (
      <MenuLayout title={''} pageDescription={''}>
         <section className={styles.products}>
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

            {/* <h1 className={styles.title}>Viandas a Domicilio</h1> */}

            {/* TODO: Hacer un componente aparte */}
            <div className={styles.types}>
               <div className={styles.container}>
                  {typesList.map(({ icon, name, model }) => (
                     <div key={name} className={styles.type} onClick={() => typeFilter(model)}>
                        <div className={styles.borderImage}>
                           <div className={styles.nextImage}>
                              <Image src={icon} width={100} height={100} />
                           </div>
                        </div>
                        <span>{name}</span>
                     </div>
                  ))}
               </div>
            </div>

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
