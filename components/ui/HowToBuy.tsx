import Image from 'next/image';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/HowToBuy.module.css';

const slides = [
   {
      icon: '/icon/comida-deliciosa.svg',
      alt: 'Elección de platos',
      title: 'LIBRE ELECCIÓN',
      lead: 'Colocá la cantidad que desees',
      text: 'Seleccioná tu menú y platos favoritos a un precio imbatible. Llevando más de 14 tenés envío gratis. Adquiriendo 28 un 10%off  y en 56 un 15%off! ¡Aprovechalos!',
   },
   {
      icon: '/icon/facil-y-rapido.svg',
      alt: 'Fecha de entrega',
      title: 'DELIVERY',
      lead: 'Seleccioná la fecha de Entrega',
      text: 'Recibimos pedidos con 48hs de anticipación para poder prepararlos especialmente para vos. ¡Seguí tu entrega en tiempo real con nuestro exclusivo sistema de alertas!',
   },
   {
      icon: '/icon/variedad.svg',
      alt: 'Forma de pago',
      title: 'PAGO',
      lead: 'Elegí lo más cómodo para vos',
      text: 'Tarjetas de crédito/débito utilizando Mercado Pago. Transferencia bancaria, adjuntando el comprobante. Efectivo al momento de la entrega.',
   },
];

export const HowToBuy = () => {
   return (
      <section className={styles.howToBuy}>
         <div className={styles.container}>
            <h2 className={styles.title}>¿Cómo Comprar?</h2>

            <div className={styles.mobile}>
               <Slide easing='ease' duration={7000} indicators>
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
                        <h5 className={styles.title}>{slide.title}</h5>
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
                     <h5 className={styles.title}>{slide.title}</h5>
                     <p className={styles.lead}>{slide.lead}</p>
                     <p className={styles.text}>{slide.text}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
