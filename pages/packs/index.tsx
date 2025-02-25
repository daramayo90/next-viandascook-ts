import { FC, useContext, useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import Modal from 'react-modal';

import { MainLayout } from '../../components/layouts';

import { dbProducts } from '../../database';
import { ICartProduct, IProduct } from '../../interfaces';

import { News } from '../../components/ui';
import { Packs, ProductSlides } from '../../components/products';

import { cloudImagesPath, currency, seo } from '../../utils';

import styles from '../../styles/packs/Packs.module.scss';
import { useRouter } from 'next/router';
import { PacksModal } from '../../components/modals';
import { CartContext } from '../../context';

interface Props {
   products: IProduct[];
   packs: IProduct[];
}

const PacksPage: NextPage<Props> = ({ products, packs }) => {
   const { title, description, keywords, canonical } = seo['PacksPage'];

   const proteicoPacks = packs.filter((pack) => pack.name.includes('proteíco'));
   const lightPacks = packs.filter((pack) => pack.name.includes('light'));

   return (
      <MainLayout
         title={title}
         pageDescription={description}
         keywords={keywords}
         can={canonical}
         index>
         <section className={styles.packs}>
            <News />
            <Packs />
            <PackCategory
               packs={lightPacks}
               src={`${cloudImagesPath}/z3tlupxcw1msfh67fh3i`}
               name={'Light'}
               content={'bajas en calorías.'}
               reverse={false}
            />
            <PackCategory
               packs={proteicoPacks}
               src={`${cloudImagesPath}/qqat9pwtdfqezw21myhi`}
               name={'Proteico'}
               content={'con alto contenido de proteínas.'}
               reverse={true}
            />
            <ProductSlides products={products} />
         </section>
      </MainLayout>
   );
};

interface PackCategoryProps {
   src: string;
   name: string;
   content: string;
   packs: IProduct[];
   reverse: boolean;
}
const PackCategory: FC<PackCategoryProps> = ({ src, name, content, packs, reverse }) => {
   const router = useRouter();
   const { query } = router;
   const { viandas = '' } = query as { viandas: string };

   const initialPack = packs.find((p) => p.slug.includes('7')) || packs[0];

   const [pack, setPack] = useState(initialPack);
   const [selectedQuantity, setSelectedQuantity] = useState<string>('7');
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const { addProductToCart } = useContext(CartContext);

   // Set the app element for accessibility
   useEffect(() => {
      Modal.setAppElement('#__next');
   }, []);

   useEffect(() => {
      if (viandas) {
         const selectedPack = packs.find((p) => p.slug.includes(viandas)) || packs[0];
         if (!selectedPack) return;
         setSelectedQuantity(viandas);
         setPack(selectedPack);
      }
   }, [viandas, packs]);

   const calculatePrice = (quantity: string) => {
      const selectedPack = packs.find((p) => p.slug.includes(quantity));
      if (!selectedPack) return 0;
      setSelectedQuantity(quantity);
      setPack(selectedPack);
   };

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);

   return (
      <section className={styles.packCategory}>
         <div className={`${styles.container} ${reverse ? styles.reverse : ''}`}>
            <div className={styles.image}>
               <Image src={src} alt='Pack Category' layout='fill' objectFit='cover' priority />
            </div>

            <div className={styles.info}>
               <div className={styles.header}>
                  <h2 className={styles.title}>{`Pack de Viandas ${name}`}</h2>
                  <p className={styles.content}>
                     {`Selección variada de nuestras viandas congeladas ${content}`}
                  </p>
               </div>

               <div className={styles.selection}>
                  <p className={styles.title}>Elegí por cantidad:</p>
                  <div className={styles.quantity}>
                     <button
                        onClick={() => calculatePrice('7')}
                        className={selectedQuantity === '7' ? styles.selected : ''}>
                        7 viandas
                     </button>
                     <button
                        onClick={() => calculatePrice('14')}
                        className={selectedQuantity === '14' ? styles.selected : ''}>
                        14 viandas
                     </button>
                     <button
                        onClick={() => calculatePrice('21')}
                        className={selectedQuantity === '21' ? styles.selected : ''}>
                        21 viandas
                     </button>
                     <button
                        onClick={() => calculatePrice('28')}
                        className={selectedQuantity === '28' ? styles.selected : ''}>
                        28 viandas
                     </button>
                  </div>
                  <p className={styles.price}>{currency.format(pack.discountPrice || pack.price)}</p>
               </div>

               <div className={styles.buttons}>
                  <div className={styles.btn}>
                     <button
                        className={styles.addToCartBtn}
                        onClick={() => addProductToCart({ ...pack, quantity: 1 } as ICartProduct)}>
                        Agregar al carrito
                     </button>
                  </div>

                  <div className={styles.btn}>
                     <button className={styles.modalBtn} onClick={openModal}>
                        Ver Platos
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Modal with the list of products in the pack */}
         <PacksModal isOpen={isModalOpen} onClose={closeModal} pack={pack} />
      </section>
   );
};

export const getStaticProps: GetStaticProps = async (context) => {
   const products = await dbProducts.getAllBestSellersProducts();
   const packs = await dbProducts.getPacks('Packs');

   return {
      props: { products, packs },
   };
};

export default PacksPage;
