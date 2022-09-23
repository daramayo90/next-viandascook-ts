import styles from '../../styles/Intro.module.css';

export const Intro = () => {
   return (
      <section className={styles.intro}>
         <div className={styles.text}>
            <p>
               En <strong>Viandas Cook</strong> te ofrecemos comidas prácticas, rápidas, caseras,
               ricas y saludables para hacer tu vida más fácil. Elaboramos nuestras viandas
               congeladas con ingredientes de la mejor calidad.
            </p>
         </div>
      </section>
   );
};
