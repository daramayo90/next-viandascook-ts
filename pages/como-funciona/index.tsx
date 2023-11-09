import { NextPage } from 'next';

import { HomeLayout } from '../../components/layouts';
import { Breadcrumbs, Button, Newsletter, Steps } from '../../components/ui';

import { seo } from '../../utils';

import styles from '../../styles/HowItWorks.module.css';

const HowItWorksPage: NextPage = () => {
   const { title, description, keywords, canonical } = seo['HowItWorksPage'];

   return (
      <HomeLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.howItWorks}>
            <Breadcrumbs />

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
                     <h2>Platos saludables listos para comer elaborados por expertos.</h2>
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
               <h3 className={styles.subTitle}>¿Cómo Funciona?</h3>
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

export default HowItWorksPage;
