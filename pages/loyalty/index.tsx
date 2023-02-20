import { HomeLayout } from '../../components/layouts';
import { Button, Newsletter, Rewards } from '../../components/ui';

import styles from '../../styles/Loyalty.module.css';

const LoyaltyPage = () => {
   return (
      <HomeLayout title={'Viandas Cook - Loyalty'} pageDescription={''}>
         <section className={styles.loyalty}>
            <div className={styles.intro}>
               <div className={styles.container}>
                  <div className={styles.videoIntro}>
                     <video autoPlay muted loop playsInline poster='/nosotros/img-intro.jpg'>
                        <source src='/nosotros/video-intro.mp4' type='video/mp4' />
                     </video>
                  </div>

                  <div className={styles.textIntro}>
                     <h1>
                        VC Loyalty:<br></br> El programa de puntos que te ayuda a comer rico,
                        práctico y saludable
                     </h1>
                     <p>
                        Unite hoy y obtené un 10% de descuento en tu primera compra. ¡Y mucho más!
                     </p>
                     <div className={styles.btn}>
                        <Button
                           href={'/menu'}
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
                  En Viandas Cook sabemos lo importante que es recompensar a nuestros clientes
                  fieles. Por eso, creamos VC Loyalty, nuestro programa de fidelización gratuito que
                  te permite acumular puntos por cada compra que realices. Y no solo eso, también te
                  ofrece beneficios exclusivos, como descuentos, cupones y puntos extra. ¡Unite hoy
                  a nuestra comunidad VC Loyalty y comenzá a disfrutar de comidas saludables y
                  convenientes con más recompensas!
               </p>
            </div>

            <Rewards />

            <div className={styles.btn}>
               <Button
                  href={'/menu'}
                  content={'Mis Puntos'}
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
