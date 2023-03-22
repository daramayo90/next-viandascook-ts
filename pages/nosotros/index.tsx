import { HomeLayout } from '../../components/layouts';

import { Button, Newsletter, SectionsUs, Steps } from '../../components/ui';

import styles from '../../styles/Nosotros.module.css';

const NosotrosPage = () => {
   return (
      <HomeLayout title={'Viandas Cook - Nosotros'} pageDescription={''}>
         <section className={styles.us}>
            <div className={styles.intro}>
               <div className={styles.container}>
                  <div className={styles.videoIntro}>
                     <video autoPlay muted loop playsInline poster='/img/nosotros-envasado.jpg'>
                        <source src='/video/nosotros-intro.mp4' type='video/mp4' />
                     </video>
                  </div>

                  <div className={styles.textIntro}>
                     <h1>
                        Viandas Cook<br></br> Tu opción <strong>saludable y deliciosa</strong>, en
                        sólo 15 minutos en tu mesa.
                     </h1>
                     <p>
                        Ofrecemos una <strong>variedad</strong> de menús que se adaptan a tus
                        necesidades y gustos, para que puedas disfrutar de comidas sabrosas sin
                        sacrificar la calidad y el tiempo.
                     </p>
                     <p>¡Hacé que tu día tenga sabor!</p>
                     <div className={styles.btn}>
                        <Button
                           href={'/menu'}
                           content={'¡Comprar!'}
                           color='var(--white)'
                           border='2px solid var(--white)'
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className={styles.presentation}>
               <h2>Nosotros</h2>
               <p>
                  Viandas Cook nació de la pasión por la comida <strong>saludable</strong> y la
                  necesidad de <strong>simplificar</strong> la vida de las personas. Creamos platos
                  que te ayudarán a organizarte en medio de tu rutina acelerada, y a llevar una
                  alimentación sabrosa y balanceada. <strong>¡En sólo 15 minutos!</strong> Para
                  nosotros, la comida es más que solo combustible: es una forma de vida saludable y
                  feliz.
               </p>
            </div>

            <SectionsUs />

            <div className={styles.btn}>
               <Button
                  href={'/menu'}
                  content={'Ver Platos'}
                  color='var(--black)'
                  border='2px solid var(--black)'
               />
            </div>

            <Newsletter />
         </section>
      </HomeLayout>
   );
};

export default NosotrosPage;
