import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import { HomeLayout } from '../../components/layouts';
import { getSortedPosts } from '../../lib/posts';

import { IPost } from '../../interfaces';

import styles from '../../styles/blog/Blog.module.scss';
import 'react-slideshow-image/dist/styles.css';
import { Button, News, Newsletter } from '../../components/ui';

interface Props {
   posts: IPost[];
}

const BlogPage: NextPage<Props> = ({ posts }) => {
   const properties = {
      prevArrow: <FaChevronCircleLeft className={styles.sliderBtn} />,
      nextArrow: <FaChevronCircleRight className={styles.sliderBtn} />,
   };

   return (
      <HomeLayout title={'Blog | Viandas Cook'} pageDescription={''} can={''}>
         <section className={styles.blog}>
            <div className={styles.intro}>
               <div className={styles.banner}>
                  <h1 className={styles.title}>
                     El Blog de <br></br>Viandas Cook
                  </h1>
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
               <div className={styles.featuredPosts}>
                  <h2 className={styles.title}>Artículos destacados</h2>
                  <article className={styles.posts}>
                     <Slide easing='ease' duration={500000} {...properties}>
                        {posts.map((post) => (
                           <Link key={post.id} href={`/blog/${post.id}`}>
                              <div key={post.id} className={styles.post}>
                                 <div className={styles.image}>
                                    <Image src={post.cover!} alt={post.title} layout='fill' />
                                 </div>
                                 <div className={styles.info}>
                                    <p className={styles.date}>{post.date}</p>
                                    <h3 className={styles.title}>{post.title}</h3>
                                    <p className={styles.description}>
                                       {post.description!.length > 140
                                          ? post.description!.substring(0, 140) + '...'
                                          : post.description}
                                    </p>
                                    <div className={styles.postBtn}>
                                       <Button
                                          href={`/blog/${post.id}`}
                                          content={'Leer más'}
                                          background='var(--primary)'
                                          color='white'
                                       />
                                    </div>
                                 </div>
                              </div>
                           </Link>
                        ))}
                     </Slide>
                  </article>
               </div>

               <div className={styles.allPosts}>
                  <h2 className={styles.title}>Todos los artículos</h2>
                  <article className={styles.posts}>
                     {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`}>
                           <div key={post.id} className={styles.post}>
                              <div className={styles.image}>
                                 <Image src={post.cover!} alt={post.title} layout='fill' />
                              </div>
                              <p className={styles.date}>{post.date}</p>
                              <h3 className={styles.title}>{post.title}</h3>
                              <p className={styles.description}>
                                 {post.description!.length > 128
                                    ? post.description!.substring(0, 128) + '...'
                                    : post.description}
                              </p>
                              <div className={styles.postBtn}>
                                 <Button
                                    href={`/blog/${post.id}`}
                                    content={'Leer más'}
                                    background='var(--primary)'
                                    color='white'
                                 />
                              </div>
                           </div>
                        </Link>
                     ))}
                  </article>
               </div>
            </div>

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
