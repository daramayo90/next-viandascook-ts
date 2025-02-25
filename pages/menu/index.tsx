import { useState, useContext, useEffect, useMemo } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Cookies from 'js-cookie';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

import { AuthContext, CartContext } from '../../context';

import { ShopLayout } from '../../components/layouts';
import { Button, CommonQuestions, DiscountSlides, News } from '../../components/ui';
import {
   Packs,
   Pagination,
   SearchProducts,
   ShippingAddress,
   TypesList,
} from '../../components/products';
import { AddressModal } from '../../components/modals';

import { seo } from '../../utils';

import styles from '../../styles/Products.module.css';

const ProductCard = dynamic(
   () => import('../../components/products').then((module) => module.ProductCard),
   { ssr: false },
);

const SearchNotFound = dynamic(
   () => import('../../components/products').then((module) => module.SearchNotFound),
   { ssr: false },
);

const PAGE_SIZE = 9;

interface Props {
   products: IProduct[];
}

const ProductsPage: NextPage<Props> = ({ products }) => {
   const { title, description, keywords, canonical } = seo['ProductsPage'];

   const router = useRouter();
   const { query } = router;

   const { numberOfItems, calculateShipping } = useContext(CartContext);
   const { isLoggedIn, isAuthLoaded } = useContext(AuthContext);

   const city = Cookies.get('city');
   const fullAddress = Cookies.get('fullAddress');
   const shortAddress = Cookies.get('address') || '-';

   const [searchTerm, setSearchTerm] = useState<string>('');
   const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

   const [type, setType] = useState<string>('');
   const [typeProducts, setTypeProducts] = useState<IProduct[]>([]);

   const [queryType, setQueryType] = useState<string>('');

   const [showModal, setShowModal] = useState(false);

   const [page, setPage] = useState(1);

   useEffect(() => {
      if (shortAddress !== '-') calculateShipping(city || 'CABA');

      if (Cookies.get('isModalShown') === 'true') return;

      if (!isAuthLoaded) return;

      if (!isLoggedIn && !fullAddress) {
         return setShowModal(true);
      }

      if (isLoggedIn && shortAddress === '-') {
         return setShowModal(true);
      }
   }, [isAuthLoaded, isLoggedIn, city]);

   useEffect(() => {
      if (query.type) {
         setQueryType(query.type as string);
      } else {
         setQueryType('');
      }
   }, [query]);

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

   const closeAddressModal = () => {
      Cookies.set('isModalShown', 'true');
      setShowModal(false);
   };

   const openAddressModal = () => {
      Cookies.set('isModalShown', 'false');
      setShowModal(true);
   };

   const shippingAddress = fullAddress || shortAddress;

   const totalItems = productsToShow.length;
   const totalPages = Math.ceil(totalItems / PAGE_SIZE);
   const startIndex = (page - 1) * PAGE_SIZE;
   const endIndex = startIndex + PAGE_SIZE;
   const pageProducts = productsToShow.slice(startIndex, endIndex);

   return (
      <ShopLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <AddressModal isOpen={showModal} onClose={closeAddressModal} />

         <section className={styles.products}>
            <News />

            <ShippingAddress shippingAddress={shippingAddress} openAddressModal={openAddressModal} />

            <SearchProducts searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />

            {!searchTerm && (
               <>
                  <DiscountSlides />

                  <TypesList type={type} setType={setType} setPage={setPage} />
               </>
            )}

            <article id='menu-products' className={styles.container}>
               {isFilterActive ? (
                  productsToShow.length > 0 ? (
                     productsToShow.map((product) => (
                        <ProductCard key={product._id} product={product} />
                     ))
                  ) : (
                     <SearchNotFound />
                  )
               ) : (
                  pageProducts.map((product) => <ProductCard key={product._id} product={product} />)
               )}
            </article>

            <Pagination totalPages={totalPages} page={page} setPage={setPage} />

            <Packs />

            <CommonQuestions />

            {numberOfItems > 0 && (
               <div className={styles.goToCartBtn}>
                  <Button
                     href={'/cart'}
                     content={'Ver Carrito'}
                     background='var(--primary)'
                     color='var(--white)'
                     border='none'
                  />
               </div>
            )}
         </section>
      </ShopLayout>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const products = await dbProducts.getAllProductsExceptPacks();

   return {
      props: { products },
   };
};

export default ProductsPage;
