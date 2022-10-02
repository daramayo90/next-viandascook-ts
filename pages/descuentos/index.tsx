import Image from 'next/image';
import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/Discounts.module.css';

const discounts = [
   {
      name: 'discount 1',
      img: '/offers/discount-1.jpg',
   },
   {
      name: 'discount 2',
      img: '/offers/discount-2.jpg',
   },
   {
      name: 'discount 3',
      img: '/offers/discount-3.jpg',
   },
   {
      name: 'discount 4',
      img: '/offers/discount-4.jpg',
   },
];

const DiscountsPage = () => {
   return (
      <ShopLayout title={''} pageDescription={''}>
         <section className={styles.discounts}>
            {discounts.map(({ name, img }) => (
               <div key={name} className={styles.nextImage}>
                  <Image src={img} alt={name} width={300} height={150} />
               </div>
            ))}
         </section>
      </ShopLayout>
   );
};

export default DiscountsPage;
