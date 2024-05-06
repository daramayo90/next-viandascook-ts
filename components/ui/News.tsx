import { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import styles from '../../styles/News.module.css';

const banners = [
   {
      name: 'Promo 10% off - Descuento Primera Compra',
      img: '/img/banner-news-mobile.jpg',
      bannerStyle: 'mobileBanner',
      isMobile: true,
   },
   {
      name: 'Promo 20% off - Lanzamiento Waffles',
      img: '/img/banner-news-waffles-mobile.jpg',
      bannerStyle: 'mobileBanner',
      isMobile: true,
   },
   {
      name: 'Promo 10% off - Descuento Primera Compra',
      img: '/img/banner-news-desktop.jpg',
      bannerStyle: 'desktopBanner',
      isMobile: false,
   },
   {
      name: 'Promo 20% off - Lanzamiento Waffles',
      img: '/img/banner-news-waffles-desktop.jpg',
      bannerStyle: 'desktopBanner',
      isMobile: false,
   },
];

export const News: FC = () => {
   // const [isDialogOpen, setIsDialogOpen] = useState(false);
   const router = useRouter();

   const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      await router.push('/menu?type=Waffles');
      window.location.hash = 'menu-products';
   };

   const propertiesMobile = {
      prevArrow: <FaChevronCircleLeft className={styles.sliderBtnMobile} />,
      nextArrow: <FaChevronCircleRight className={styles.sliderBtnMobile} />,
   };

   const propertiesDesktop = {
      prevArrow: <FaChevronCircleLeft className={styles.sliderBtnDesktop} />,
      nextArrow: <FaChevronCircleRight className={styles.sliderBtnDesktop} />,
   };

   const mobileBanners = banners.filter((banner) => banner.isMobile === true);
   const desktopBanners = banners.filter((banner) => banner.isMobile === false);

   return (
      // <a href='#menu-products'>
      <section className={styles.news}>
         <div className={styles.container}>
            <Slide easing='ease' duration={3500} {...propertiesMobile}>
               {mobileBanners.map(({ name, img, bannerStyle }) => (
                  <div key={name} className={styles[bannerStyle]}>
                     <Image src={img} alt={name} layout='fill' objectFit='cover' />
                  </div>
               ))}
            </Slide>
            <Slide easing='ease' duration={3500} {...propertiesDesktop}>
               {desktopBanners.map(({ name, img, bannerStyle }) => (
                  <div key={name} className={styles[bannerStyle]}>
                     <Image src={img} alt={name} layout='fill' objectFit='cover' />
                  </div>
               ))}
            </Slide>
         </div>
      </section>
      // </a>
   );
};
