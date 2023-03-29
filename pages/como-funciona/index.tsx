import { HomeLayout } from '../../components/layouts';

import { Button, Newsletter, Steps } from '../../components/ui';

import styles from '../../styles/HowItWorks.module.css';

const ComoFuncionaPage = () => {
   return (
      <HomeLayout title={'Viandas Cook - ¿Cómo Funciona?'} pageDescription={''}>
         <section className={styles.howItWorks}>
            <div className={styles.intro}>
               <div className={styles.container}>
                  <div className={styles.videoIntro}>
                     <video autoPlay muted loop playsInline poster='/img/como-funciona-intro.jpg'>
                        <source
                           src='https://res.cloudinary.com/viandascook/video/upload/v1680120195/videos/in1klme0ztwkkmu60ijp.mp4'
                           type='video/mp4'
                        />
                     </video>
                  </div>

                  <div className={styles.textIntro}>
                     <h1>Platos saludables listos para comer elaborados por expertos.</h1>
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
               <h2 className={styles.subTitle}>¿Cómo Funciona?</h2>
               <p>
                  En <strong>Viandas Cook</strong> te ofrecemos comidas prácticas, caseras, ricas y
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
      </HomeLayout>
   );
};

export default ComoFuncionaPage;
