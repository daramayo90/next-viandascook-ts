import styles from '../../styles/Intro.module.css';

export const Intro = () => {
   return (
      <section className={styles.intro}>
         <div className={styles.text}>
            <p>
               En <strong>Viandas Cook</strong> te ofrecemos comidas prácticas, rápidas, caseras, y
               saludables para hacer tu vida más fácil y rica. Elaboramos nuestras viandas
               congeladas con ingredientes de la mejor calidad. ¡De freezer a tu mesa en 15 minutos
            </p>
         </div>
      </section>
   );
};
