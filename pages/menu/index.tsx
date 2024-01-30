import { useState, useContext, useEffect, useMemo } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { CartContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import { Breadcrumbs, Button, DiscountSlides, News } from '../../components/ui';
import { SearchProducts, TypesList } from '../../components/products';

import { seo } from '../../utils';

import LoadingPage from '../../components/ui/Loading';

import styles from '../../styles/Products.module.css';

const ProductCard = dynamic(
   () => import('../../components/products').then((module) => module.ProductCard),
   { ssr: false },
);

const SearchNotFound = dynamic(
   () => import('../../components/products').then((module) => module.SearchNotFound),
   { ssr: false },
);

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   const { title, description, keywords, canonical } = seo['ProductsPage'];

   const router = useRouter();

   const [page, setPage] = useState(2);
   const [hasMore, setHasMore] = useState(true);
   const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);

   const [searchTerm, setSearchTerm] = useState<string>('');
   const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

   const [type, setType] = useState<string>('');
   const [typeProducts, setTypeProducts] = useState<IProduct[]>([]);

   const [queryType, setQueryType] = useState<string>('');

   const { numberOfItems } = useContext(CartContext);

   useEffect(() => {
      if (router.query.type) {
         setQueryType(router.query.type as string);
      } else {
         setQueryType('');
      }
   }, [router.query]);

   useEffect(() => {
      setDisplayedProducts(products.slice(0, 6));
   }, [products]);

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

   const isFilterActive = searchTerm || type || queryType;

   const productsToShow = useMemo(() => {
      if (typeProducts.length > 0 || queryType !== '') {
         return typeProducts;
      } else if (searchProducts.length > 0) {
         return searchProducts;
      } else {
         return [];
      }
   }, [typeProducts, queryType, searchProducts]);

   const loadMoreProducts = async () => {
      if (isFilterActive) return;

      let limit = 6;

      // if (searchProducts.length > 0) limit = searchProducts.length

      const { data } = await axios.get<IProduct[]>(`/api/products?page=${page}&limit=${limit}`);

      if (data.length === 0) return setHasMore(false);

      setDisplayedProducts((prevProducts) => [...prevProducts, ...data]);
      setPage(page + 1);
   };

   return (
      <ShopLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.products}>
            <Breadcrumbs />

            <News />

            <SearchProducts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {!searchTerm && (
               <>
                  <DiscountSlides />

                  <TypesList type={type} setType={setType} />
               </>
            )}

            <InfiniteScroll
               dataLength={displayedProducts.length}
               next={loadMoreProducts}
               hasMore={hasMore}
               loader={<LoadingPage />}>
               <article className={styles.container}>
                  {isFilterActive ? (
                     productsToShow.length > 0 ? (
                        productsToShow.map((product) => (
                           <ProductCard key={product._id} product={product} />
                        ))
                     ) : (
                        <SearchNotFound />
                     )
                  ) : (
                     displayedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                     ))
                  )}
               </article>
            </InfiniteScroll>

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
