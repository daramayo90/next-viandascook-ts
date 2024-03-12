import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/Values.module.css';

const valueList = [
   {
      src: '/icon/home-comida-deliciosa.jpg',
      alt: 'Comida Deliciosa',
      title: 'Comida Deliciosa',
      text: (
         <>
            Nuestros platos son elaborados en casa, con ingredientes de la mejor calidad. Tan ricos
            como la comida de tu abuela.
            <Link href='/menu'>
               <a>
                  <strong> ¡Probá nuestros platos y sentí el amor que ponemos en cada bocado!</strong>
               </a>
            </Link>
         </>
      ),
   },
   {
      src: '/icon/home-variedad.jpg',
      alt: 'Variedad de Comidas',
      title: 'No Necesitas Suscribirte',
      text: 'Queremos que disfrutes de una comida rica y saludable sin esfuerzo. Por eso, no te pedimos suscripción previa. Pedí tu vianda de forma sencilla y disfrutá de una experiencia de compra sin complicaciones.',
   },
   {
      src: '/icon/home-facil-y-rapido.jpg',
      alt: 'Fácil y Rápido',
      title: 'Fácil y Rápido',
      text: 'Disfrutá de más tiempo para vos mientras nosotros nos encargamos de la comida. Recibimos pedidos con 48hs de anticipación. ¡Seguí tu entrega en tiempo real con nuestro exclusivo sistema de alertas!',
   },
];

export const Values = () => {
   return (
      <section className={styles.values}>
         <div className={styles.container}>
            <h2 className={styles.title}>
               ¿Por qué elegir <strong>Viandas Cook</strong>?
            </h2>

            <div className={styles.list}>
               {valueList.map((value) => (
                  <div key={value.title} className={styles.listContainer}>
                     <Link href='/menu'>
                        <div className={styles.nextImage}>
                           <Image src={value.src} alt={value.alt} width={280} height={340} />
                        </div>
                     </Link>
                     <div className={styles.description}>
                        <h3 className={styles.title}>{value.title}</h3>
                        <p className={styles.text}>{value.text}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
