import { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import styles from '../../styles/News.module.css';
import { cloudImagesPath } from '../../utils';

interface Banner {
   name: string;
   img: string;
   bannerStyle: string;
   isMobile: boolean;
   link?: string;
}

const banners: Banner[] = [
   /* MOBILE BANNERS */

   {
      name: 'Cyber Monday - 15% off',
      img: `${cloudImagesPath}/Banners/zytxzpytd5jezhepgvcc`,
      bannerStyle: 'mobileBanner',
      isMobile: true,
   },
   {
      name: 'Promo 10% off - Descuento Primera Compra',
      img: '/img/banner-news-mobile.jpg',
      bannerStyle: 'mobileBanner',
      isMobile: true,
   },
   {
      name: 'Viandas Club',
      img: `${cloudImagesPath}/Banners/bp5rlp3djrjjjfj8o3ex`,
      bannerStyle: 'mobileBanner',
      link: '/loyalty',
      isMobile: true,
   },
   {
      name: 'Referidos',
      img: `${cloudImagesPath}/Banners/lyqumeybf8fiumdikfqb`,
      bannerStyle: 'mobileBanner',
      link: '/mi-cuenta/invitar-amigos',
      isMobile: true,
   },

   /* DEESKTOP BANNERS */

   {
      name: 'Cyber Monday - 15% off',
      img: `${cloudImagesPath}/Banners/sa3u8r3shbwv8c4jt104`,
      bannerStyle: 'desktopBanner',
      isMobile: false,
   },
   {
      name: 'Promo 10% off - Descuento Primera Compra',
      img: `${cloudImagesPath}/Banners/njjfj85li2udnbmrxq9s`,
      bannerStyle: 'desktopBanner',
      isMobile: false,
   },
   {
      name: 'Viandas Club',
      img: `${cloudImagesPath}/Banners/bwd7fachrjrn1ieytsni`,
      bannerStyle: 'desktopBanner',
      link: '/loyalty',
      isMobile: false,
   },
   {
      name: 'Referidos',
      img: `${cloudImagesPath}/Banners/egyue6hfdealkwii7x2l`,
      bannerStyle: 'desktopBanner',
      link: '/mi-cuenta/invitar-amigos',
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

   const renderBanner = ({ name, img, bannerStyle, link }: Banner) =>
      link ? (
         <Link href={link} key={name}>
            <a className={styles[bannerStyle]}>
               <Image src={img} alt={name} layout='fill' objectFit='cover' />
            </a>
         </Link>
      ) : (
         <div key={name} className={styles[bannerStyle]}>
            <Image src={img} alt={name} layout='fill' objectFit='cover' />
         </div>
      );

   return (
      // <a href='#menu-products'>
      <section className={styles.news}>
         <div className={styles.container}>
            <Slide easing='ease' duration={5500} {...propertiesMobile}>
               {mobileBanners.map(renderBanner)}
            </Slide>
            <Slide easing='ease' duration={5500} {...propertiesDesktop}>
               {desktopBanners.map(renderBanner)}
            </Slide>
         </div>
      </section>
      // </a>
   );
};
