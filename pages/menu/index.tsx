import { GetStaticProps, NextPage } from 'next';
import { CartMenu } from '../../components/cart';
import { MainLayout } from '../../components/layouts';
import { ProductCard } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import styles from '../../styles/Products.module.css';

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   return (
      <MainLayout title={''} pageDescription={''}>
         <section className={styles.products}>
            <h1 className={styles.title}>Viandas a Domicilio</h1>

            <article className={styles.container}>
               {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
               ))}
            </article>
         </section>

         <CartMenu />
      </MainLayout>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getAllProducts();

   return {
      props: { products },
   };
};

export default ProductsPage;
