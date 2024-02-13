import styles from '../../styles/Intro.module.css';

export const Intro = () => {
   return (
      <section className={styles.intro}>
         <div className={styles.text}>
            <p>
               ¡Bienvenido a <strong>Viandas Cook</strong>, donde la comida fácil y sabrosa es nuestra
               especialidad! Con nuestras viandas caseras a domicilio, hace que tu vida se vuelva más
               sencilla. Elaboradas con ingredientes top, nuestras viandas congeladas van directo del
               freezer a tu mesa en solo 15 minutos.
            </p>
            <p> ¡Consultanos y hacé tu pedido ahora!</p>
         </div>
      </section>
   );
};
