import Image from 'next/image';

import styles from '../../styles/Values.module.css';

const valueList = [
   {
      src: '/icon/home-comida-deliciosa.png',
      alt: 'Comida Deliciosa',
      title: 'Comida Deliciosa',
      text: 'Nuestros platos son elaborados en casa, con ingredientes de la mejor calidad. Tan ricos como la comida de tu abuela. ¡Probá nuestros platos y sentí el amor que ponemos en cada bocado!',
   },
   {
      src: '/icon/home-variedad.png',
      alt: 'Variedad de Comidas',
      title: 'Variedad al mejor precio',
      text: 'Organizá tu menú semanal con nuestras viandas, tenemos opciones para todos los paladares desde carne hasta menúes veganos y vegetarianos.',
   },
   {
      src: '/icon/home-facil-y-rapido.png',
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
                     <div className={styles.nextImage}>
                        <Image src={value.src} alt={value.alt} width={70} height={70} />
                     </div>
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
