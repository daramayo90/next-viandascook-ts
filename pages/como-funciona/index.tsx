import { ShopLayout } from '../../components/layouts';

import { Button, Newsletter, Steps } from '../../components/ui';

import styles from '../../styles/HowItWorks.module.css';

const ComoFuncionaPage = () => {
   return (
      <ShopLayout title={'¿Cómo Funciona?'} pageDescription={''}>
         <section className={styles.howItWorks}>
            <div className={styles.intro}>
               <div className={styles.container}>
                  <div className={styles.videoIntro}>
                     <video autoPlay muted loop playsInline poster='/howItWorks/img-intro.jpg'>
                        <source src='/howItWorks/video-intro.mp4' type='video/mp4' />
                     </video>
                  </div>

                  <div className={styles.textIntro}>
                     <h1>Comidas saludables listas para comer elaboradas por expertos</h1>
                     <p>
                        Nuestros cocineros te llevan a tu mesa una variedad de comidas frescas y
                        saludables todos los días
                     </p>
                     <div className={styles.btn}>
                        <Button
                           href={'/menu'}
                           content={'Ver Menú'}
                           color='var(--white)'
                           border='2px solid var(--white)'
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className={styles.presentation}>
               <h2>¿Cómo Funciona?</h2>
               <p>
                  En Viandas Cook te ofrecemos comidas prácticas, rápidas, caseras, ricas y
                  saludables para hacer tu vida más fácil.
               </p>
            </div>

            <Steps />

            <div className={styles.btn}>
               <Button
                  href={'/menu'}
                  content={'¡Comprar!'}
                  color='var(--black)'
                  border='2px solid var(--black)'
               />
            </div>

            <Newsletter />
         </section>
      </ShopLayout>
   );
};

export default ComoFuncionaPage;
