import Image from 'next/image';
import Link from 'next/link';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/HowToBuy.module.css';

const slides = [
   {
      icon: '/icon/home-carrito.png',
      alt: 'Elección de platos',
      lead: 'Elegí tus viandas saludables favoritas',
      text: (
         <>
            <Link href='/menu'>
               <a>
                  <strong>Seleccioná tus platos </strong>
               </a>
            </Link>
            preferidos a un precio imbatible. Viandas veggies, bajas en carbohidratos, bajas en
            calorías y mucho más.
         </>
      ),
   },
   {
      icon: '/icon/home-delivery.png',
      alt: 'Fecha de entrega',
      lead: 'Aprovechá nuestras promociones',
      text: (
         <>
            Con 28, un 10% de descuento, y con 56, un 15% de descuento.
            <Link href='/descuentos'>
               <a>
                  <strong> ¡No te lo pierdas!</strong>
               </a>
            </Link>
         </>
      ),
   },
   {
      icon: '/icon/home-pagos.png',
      alt: 'Disfruta tu pedido',
      lead: 'Elegí cuándo querés recibir tu pedido',
      text: 'Realizá tu pedido con 48 horas de anticipación y nosotros nos encargamos de prepararlo especialmente para vos. ¡Podés seguir tu entrega en tiempo real gracias a nuestro sistema de alertas exclusivo!',
   },
];

export const HowToBuy = () => {
   return (
      <section className={styles.howToBuy}>
         <div className={styles.container}>
            <h2 className={styles.title}>¿Cómo Funciona Viandas Cook?</h2>

            <div className={styles.mobile}>
               <Slide easing='ease' duration={7000} indicators={false}>
                  {slides.map((slide) => (
                     <div key={slide.alt} className={styles.box}>
                        <div className={styles.icon}>
                           <Image
                              src={slide.icon}
                              alt={slide.alt}
                              width={100}
                              height={100}
                              priority={true}
                           />
                        </div>
                        <p className={styles.lead}>{slide.lead}</p>
                        <p className={styles.text}>{slide.text}</p>
                     </div>
                  ))}
               </Slide>
            </div>

            <div className={styles.desktop}>
               {slides.map((slide) => (
                  <div key={slide.alt} className={styles.box}>
                     <div className={styles.icon}>
                        <Image
                           src={slide.icon}
                           alt={slide.alt}
                           width={100}
                           height={100}
                           priority={true}
                        />
                     </div>
                     <p className={styles.lead}>{slide.lead}</p>
                     <p className={styles.text}>{slide.text}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
