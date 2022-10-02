import { GetStaticProps, NextPage } from 'next';
import { CartMenu } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { ProductCard2 } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import styles from '../../styles/Products.module.css';

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.products}>
            <h1 className={styles.title}>Viandas a Domicilio</h1>

            <article className={styles.container}>
               {products.map((product) => (
                  <ProductCard2 key={product._id} product={product} />
               ))}
            </article>
         </section>

         {/* <CartMenu /> */}
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
