import styles from '../../styles/Values.module.css';

const valueList = [
   {
      src: '/img/icons/comida-deliciosa.svg',
      alt: 'Comida Deliciosa',
      title: 'Comida Deliciosa',
      text: 'Nuestros platos son elaborados en casa, con ingredientes de la mejor calidad. Tan ricos como la comida de tu abuela.',
   },
   {
      src: '/img/icons/variedad.svg',
      alt: 'Variedad de Comidas',
      title: 'Variedad al mejor precio',
      text: 'Ofrecemos más de 70 platos a un precio imbatible. Organizá tu menú semanal con nuestras viandas.',
   },
   {
      src: '/img/icons/facil-y-rapido.svg',
      alt: 'Fácil y Rápido',
      title: 'Fácil y Rápido',
      text: 'Recibimos pedidos con 48hs de anticipación. ¡Seguí tu entrega en tiempo real con nuestro exclusivo sistema de alertas!',
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
                     <img src={value.src} alt={value.alt} />
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
