import { FC } from 'react';
import styles from '../styles/Intro.module.scss';

interface Props {
   neighborhood: string;
}

export const IntroNeighborhood: FC<Props> = ({ neighborhood }) => {
   return (
      <section className={styles.intro}>
         <div className={styles.text}>
            <p>!Hola vecinos de {neighborhood}!</p>
            <p>
               ¡Bienvenidos a{' '}
               <strong>Viandas Cook, donde la comida fácil y sabrosa es nuestra especialidad!</strong>
            </p>
            <p>
               Con nuestras viandas caseras a domicilio,{' '}
               <strong>tu vida en {neighborhood} se vuelve más sencilla que nunca</strong>. Elaboradas
               con ingredientes top, nuestras viandas congeladas van directo del freezer a tu mesa en
               solo 15 minutos.
            </p>
            <p> ¡Consultanos y hacé tu pedido ahora!</p>
         </div>
      </section>
   );
};
