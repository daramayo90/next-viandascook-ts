import { NextPage } from 'next';
import { HomeLayout } from '../../components/layouts';
import { Breadcrumbs, Button, Newsletter, Rewards } from '../../components/ui';
import { seo } from '../../utils';

import styles from '../../styles/Loyalty.module.css';

const LoyaltyPage: NextPage = () => {
   const { title, description, keywords, canonical } = seo['LoyaltyPage'];

   return (
      <HomeLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.loyalty}>
            <Breadcrumbs />

            <div className={styles.intro}>
               <div className={styles.container}>
                  <div className={styles.videoIntro}>
                     <video autoPlay muted loop playsInline poster='/img/loyalty-intro.jpg'>
                        <source
                           src='https://res.cloudinary.com/viandascook/video/upload/v1680120195/videos/f0fanvgrj3ocy6hyfg8u.mp4'
                           type='video/mp4'
                        />
                     </video>
                  </div>

                  <div className={styles.textIntro}>
                     <h2>
                        VC Loyalty<br></br> El programa de puntos que te ayuda a comer rico, práctico y
                        saludable
                     </h2>
                     <p>Unite hoy y obtené un 10% de descuento en tu primera compra. ¡Y mucho más!</p>
                     <div className={styles.btn}>
                        <Button
                           href={'/mi-cuenta/puntos'}
                           content={'Mis Puntos'}
                           color='var(--white)'
                           border='2px solid var(--white)'
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className={styles.presentation}>
               <p>
                  En <strong>Viandas Cook</strong> sabemos lo importante que es recompensar a nuestros
                  clientes fieles. Por eso, creamos <strong>VC Loyalty</strong>, nuestro programa de
                  fidelización gratuito que te permite acumular puntos por cada compra que realices. Y
                  no solo eso, también te ofrece beneficios exclusivos, como descuentos, cupones y
                  puntos extra. ¡Sé un <strong>Viandlover</strong> y comenzá a disfrutar de comidas
                  saludables y convenientes con más recompensas!
               </p>
            </div>

            <Rewards />

            <div className={styles.btn}>
               <Button
                  href={'/mi-cuenta/puntos'}
                  content={'Ver Puntos'}
                  color='var(--black)'
                  border='2px solid var(--black)'
               />
            </div>

            <Newsletter />
         </section>
      </HomeLayout>
   );
};

export default LoyaltyPage;
