import { NextPage } from 'next';

import { HomeLayout } from '../../components/layouts';
import { Breadcrumbs, Button, Newsletter, SectionsUs } from '../../components/ui';

import { seo } from '../../utils';

import styles from '../../styles/Nosotros.module.css';

const NosotrosPage: NextPage = () => {
   const { title, description, keywords, canonical } = seo['NosotrosPage'];

   return (
      <HomeLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.us}>
            <Breadcrumbs />

            <div className={styles.intro}>
               <div className={styles.container}>
                  <div className={styles.videoIntro}>
                     <video autoPlay muted loop playsInline poster='/img/nosotros-envasado.jpg'>
                        <source
                           src='https://res.cloudinary.com/viandascook/video/upload/v1680120193/videos/zgx6uoz6jwvhrcanfyzz.mp4'
                           type='video/mp4'
                        />
                     </video>
                  </div>

                  <div className={styles.textIntro}>
                     <h2>Nuestra clave es ser flexibles y adaptarnos a tus necesidades</h2>
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
                  necesidad de <strong>simplificar</strong> la vida de las personas. Creamos platos que
                  te ayudarán a organizarte en medio de tu rutina acelerada, y a llevar una
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
                  color='var(--white)'
                  background='var(--secondary)'
                  border='2px solid var(--secondary)'
               />
            </div>

            <Newsletter />
         </section>
      </HomeLayout>
   );
};

export default NosotrosPage;
