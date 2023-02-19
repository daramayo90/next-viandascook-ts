import { HomeLayout } from '../../components/layouts';

import { Button, Newsletter, SectionsUs, Steps } from '../../components/ui';

import styles from '../../styles/Nosotros.module.css';

const NosotrosPage = () => {
   return (
      <HomeLayout title={'Nosotros'} pageDescription={''}>
         <section className={styles.us}>
            <div className={styles.intro}>
               <div className={styles.container}>
                  <div className={styles.videoIntro}>
                     <video autoPlay muted loop playsInline poster='/nosotros/img-intro.jpg'>
                        <source src='/nosotros/video-intro.mp4' type='video/mp4' />
                     </video>
                  </div>

                  <div className={styles.textIntro}>
                     <h1>
                        Viandas Cook:<br></br> Tu opción más saludable y deliciosa para comer en
                        casa
                     </h1>
                     <p>
                        Nuestro equipo de chefs y nutricionistas trabajan juntos para ofrecer una
                        variedad de menús que se adaptan a tus necesidades y gustos, para que puedas
                        disfrutar de comidas sabrosas sin sacrificar la calidad ni la salud. ¿Te
                        animas a probar nuestras viandas?
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
               <h2>Nosotros</h2>
               <p>
                  Viandas Cook nació de la pasión por la comida saludable y la necesidad de
                  simplificar la vida de las personas ocupadas. Ofrecemos comidas saludables y
                  convenientes, sin sacrificar el sabor o la calidad. Trabajamos con los mejores
                  ingredientes para crear deliciosas comidas que satisfagan el apetito y nutran el
                  cuerpo. Para nosotros, la comida es más que solo combustible: es una forma de vida
                  saludable y feliz.
               </p>
            </div>

            <SectionsUs />

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

export default NosotrosPage;
