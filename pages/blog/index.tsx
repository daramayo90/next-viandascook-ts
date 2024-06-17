import { GetStaticProps, NextPage } from 'next';

import { getSortedPosts } from '../../lib/posts';
import { HomeLayout } from '../../components/layouts';
import { Newsletter } from '../../components/ui';
import { AllPosts, ElementsPng, FeaturedPosts } from '../../components/ui/blog';

import { IPost } from '../../interfaces';

import { seo } from '../../utils/seo';

import styles from '../../styles/blog/Blog.module.scss';

interface Props {
   posts: IPost[];
}

const BlogPage: NextPage<Props> = ({ posts }) => {
   const { title, description, canonical } = seo['BlogPage'];

   return (
      <HomeLayout title={title} pageDescription={description} can={canonical}>
         <section className={styles.blog}>
            <div className={styles.intro}>
               <div className={styles.banner}>
                  <h1 className={styles.mobileTitle}>
                     El Blog de <br></br>Viandas Cook
                  </h1>
                  <h1 className={styles.title}>El Blog de Viandas Cook</h1>
               </div>
               <div className={styles.epigraph}>
                  <p className={styles.text}>¡Sumate al blog de Viandas Cook!</p>
                  <p className={styles.text}>
                     Sumergíte en un mundo de sabores y descubrí todo lo que tenemos preparado para
                     vos: desde consejos útiles para una alimentación saludable hasta ideas de recetas
                     creativas y deliciosas para inspirar tus comidas diarias. Explorá nuestras notas
                     sobre nutrición, bienestar y estilo de vida, pensadas y escritas para ayudarte a
                     alcanzar tus objetivos de salud de una manera sencilla y deliciosa.
                  </p>
               </div>
            </div>

            <div className={styles.container}>
               <FeaturedPosts posts={posts.slice(0, 3)} />

               <AllPosts posts={posts} />
            </div>

            <ElementsPng />

            <Newsletter />
         </section>
      </HomeLayout>
   );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
   const posts = getSortedPosts();

   return {
      props: { posts },
   };
};
