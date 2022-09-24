import { GetStaticProps, NextPage } from 'next';
import { ProductCard } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import styles from '../../styles/Products.module.css';

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   return (
      <section className={styles.products}>
         <h1 className={styles.title}>Viandas a Domicilio</h1>

         {products.map((product) => (
            <ProductCard key={product._id} product={product} />
         ))}
      </section>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getAllProducts();

   return {
      props: { products },
   };
};

export default ProductsPage;
