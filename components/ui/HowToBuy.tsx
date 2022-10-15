import Image from 'next/image';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from '../../styles/HowToBuy.module.css';

const slides = [
   {
      icon: '/img/icons/comida-deliciosa.svg',
      alt: 'Elegí tus platos',
      title: 'LIBRE ELECCIÓN',
      lead: 'Elegí tus Platos',
      text: 'Seleccioná tu menú y platos favoritos a un precio imbatible. Accedé a un descuento adicional, llevando más de 14 de una misma categoría.',
   },
   {
      icon: '/img/icons/facil-y-rapido.svg',
      alt: 'Fecha de Entrega',
      title: 'DELIVERY',
      lead: 'Fecha de Entrega',
      text: 'Recibimos pedidos con 48hs de anticipación. ¡Seguí tu entrega en tiempo real con nuestro exclusivo sistema de alertas!',
   },
   {
      icon: '/img/icons/variedad.svg',
      alt: 'Formas de Pago',
      title: 'PAGO',
      lead: 'Formas de Pago',
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
