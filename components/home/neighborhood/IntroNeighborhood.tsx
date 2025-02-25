import { FC } from 'react';
import Image from 'next/image';

import styles from '../styles/Intro.module.scss';

interface Props {
   neighborhood: string;
}

export const IntroNeighborhood: FC<Props> = ({ neighborhood }) => {
   return (
      <section className={styles.intro}>
         <div className={styles.container}>
            <div className={styles.logo}>
               <Image
                  src='/logo/viandascook-logo-primary.png'
                  alt='viandascook-logo'
                  width={100}
                  height={35}
                  layout='responsive'
                  priority={true}
               />
            </div>
            <p className={styles.title}>
               ¡Bienvenido a Viandas Cook vecino de {neighborhood}, donde la comida saludable y
               deliciosa llega directo a tu puerta!
            </p>
            <p className={styles.content}>
               Hechos con ingredientes de calidad, nuestros platos pasan del freezer a tu mesa en solo
               15 minutos. Ahora también podés disfrutar de nuestros packs de viandas congeladas, con
               opciones de proteínas vegetales y animales, ideales para adaptarse a tu gusto y estilo
               de vida en {neighborhood}.
            </p>
            <p className={styles.content}>¡Organizá tu menú semanal de manera fácil y práctica!</p>
         </div>
      </section>
   );
};
