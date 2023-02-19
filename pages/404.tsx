import type { NextPage } from 'next';
import Link from 'next/link';

import { HomeLayout } from '../components/layouts';
import { Button } from '../components/ui';

import styles from '../styles/Error.module.css';

const Custom404: NextPage = () => {
   return (
      <HomeLayout title='Página no encontrada' pageDescription='Nada que mostrar por acá'>
         <section className={styles.error404}>
            <div className={styles.container}>
               <h1 className={styles.title}>404</h1>
               <h2 className={styles.text}>
                  Lo siento, no pudimos encontrar la página que estás buscando
               </h2>
               <div>
                  <Button
                     href={'/menu'}
                     content={'Ver platos'}
                     color='var(--black)'
                     border='2px solid var(--black)'
                  />
               </div>
               <p className={styles.faqs}>
                  ¿Tenés alguna pregunta? Podes visitar nuestras{' '}
                  <Link href={'/preguntas'}>
                     <span>FAQs</span>
                  </Link>
                  , o contactar con nosotros a <span>info@viandascook.com</span>
               </p>
            </div>
         </section>
      </HomeLayout>
   );
};

export default Custom404;
