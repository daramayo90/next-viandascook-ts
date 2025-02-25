import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { Slide } from 'react-slideshow-image';

import { cloudIcons } from '../../utils';

import 'react-slideshow-image/dist/styles.css';
import styles from './styles/HowItWorks.module.scss';

const slides = [
   {
      icon: `${cloudIcons}/vext3njbld3qmyp40re7`,
      alt: 'Elección de platos',
      title: 'Elegí tus viandas saludables favoritas',
      text: (
         <>
            <Link href='/menu'>
               <a>
                  <strong>Seleccioná tus platos </strong>
               </a>
            </Link>
            o packs preferidos a un precio imbatible. Viandas veggies, bajas en carbohidratos o
            calorías, y mucho más.
         </>
      ),
   },
   {
      icon: `${cloudIcons}/t9lgsh0yewrpboo6bogv`,
      alt: 'Pedido a domicilio',
      title: 'Recibí tu pedido en tu domicilio',
      text: 'Hacé tu pedido con 48 horas de anticipación y recibilo en la comodidad de tu hogar, de lunes a viernes.',
   },
   {
      icon: `${cloudIcons}/v15m31kjhrxd40w4akxz`,
      alt: 'Disfrutá tu pedido',
      title: 'Calentá y disfrutá',
      text: 'Sacá tu comida del freezer, retirala de la bolsa y calentala en una olla con agua hirviendo. En 15 minutos, tendrás una comida deliciosa y lista para disfrutar, sin complicaciones.',
   },
];

export const HowItWorks = () => {
   const responsivness = [
      {
         breakpoint: 999,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
         },
      },
      {
         breakpoint: 720,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
         },
      },
      {
         breakpoint: 500,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ];

   const props = {
      prevArrow: <CiCircleChevLeft className={styles.leftArrow} />,
      nextArrow: <CiCircleChevRight className={styles.rightArrow} />,
      indicators: false,
      autoplay: false, // <- Disable autoplay
      infinite: true, // <- Enable looping
      duration: 0,
      transitionDuration: 500, // Controls the slide transition speed if you do click next/prev
      responsive: responsivness,
   };

   return (
      <section className={styles.howItWorks}>
         <div className={styles.header}>
            <h2 className={styles.title}>¿Cómo Funciona Viandas Cook?</h2>
         </div>

         <div className={styles.container}>
            <Slide easing='ease' {...props}>
               {slides.map(({ icon, alt, title, text }) => (
                  <BoxSlide key={icon} icon={icon} alt={alt} title={title} text={text} />
               ))}
            </Slide>
         </div>
      </section>
   );
};

interface BoxSlideProps {
   icon: string;
   alt: string;
   title: string;
   text: string | JSX.Element;
}
const BoxSlide: FC<BoxSlideProps> = ({ icon, alt, title, text }) => {
   return (
      <div key={alt} className={styles.box}>
         <div className={styles.icon}>
            <Image src={icon} alt={alt} width={90} height={90} priority={true} />
         </div>
         <div className={styles.content}>
            <p className={styles.title}>{title}</p>
            <p className={styles.text}>{text}</p>
         </div>
      </div>
   );
};
