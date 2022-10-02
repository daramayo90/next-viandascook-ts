import { ChangeEvent, FormEvent, useState } from 'react';
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

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
   };

   const onSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   const typeFilter = (type: string) => {
      setType(type);
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
                              <Image src={icon} width={100} height={100} priority />
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
