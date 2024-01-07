import Image from 'next/image';
import Link from 'next/link';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/HowToBuy.module.css';

const slides = [
   {
      icon: '/icon/home-carrito.png',
      alt: 'Elección de platos',
      lead: 'Elegí tu menú / comida saludable',
      text: (
         <>
            <Link href='/menu'>
               <a>
                  <strong>Seleccioná tu menú y platos </strong>
               </a>
            </Link>
            favoritos a un precio imbatible. Llevando más de 14 tenés envío gratis. Adquiriendo 28 un
            10%off y en 56 un 15%off! ¡Aprovechalos!
         </>
      ),
   },
   {
      icon: '/icon/home-delivery.png',
      alt: 'Fecha de entrega',
      lead: 'Seleccioná la fecha de entrega que desees',
      text: 'Recibimos pedidos con 48hs de anticipación para poder prepararlos especialmente para vos. ¡Seguí tu entrega en tiempo real con nuestro exclusivo sistema de alertas!',
   },
   {
      icon: '/icon/home-pagos.png',
      alt: 'Disfruta tu pedido',
      lead: 'Preparado especialmente para vos',
      text: 'Relajate y saboreá la calidad de nuestros platos. Nosotros nos encargamos de llevar la delicia directamente a tu mesa.',
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
