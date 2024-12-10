import styles from '../../styles/Intro.module.css';
import { Button } from './Button';

export const Intro = () => {
   return (
      <section className={styles.intro}>
         <div className={styles.text}>
            <p>
               ¡Bienvenido a <strong>Viandas Cook</strong>, donde la comida saludable y sabrosa llega a
               tu puerta! Con nuestras viandas congeladas a domicilio, disfrutar de comida casera todos
               los días nunca fue tan fácil. Hechas con ingredientes de calidad, van del freezer a tu
               mesa en solo 15 minutos.
            </p>
         </div>
         <div className={styles.btn}>
            <Button
               href={'/nosotros'}
               content={'Quiero saber más'}
               background='var(--secondary)'
               color='white'
            />
         </div>
      </section>
   );
};
