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
            <div className={styles.container}>
               <div className={styles.banner}>
                  <h1 className={styles.title}>
                     El Blog de <br></br>Viandas Cook
                  </h1>
                  <p className={styles.epigraph}>
                     Un texto bla bla bla para que completemos más adelante. Un texto bla bla bla para
                     que completemos más adelante. Un texto bla bla bla para que completemos más
                     adelante.
                  </p>
               </div>

               <div className={styles.featuredPosts}>
                  <h2 className={styles.title}>Artículos destacados</h2>
                  <article className={styles.posts}>
                     <Slide easing='ease' duration={5000} {...properties}>
                        {posts.map((post) => (
                           <Link key={post.id} href={`/blog/${post.id}`}>
                              <div key={post.id} className={styles.post}>
                                 <div className={styles.image}>
                                    <Image
                                       src={`/posts/${post.id}.jpg`}
                                       alt={post.title}
                                       layout='fill'
                                    />
                                 </div>
                                 <p className={styles.date}>{post.date}</p>
                                 <h3 className={styles.title}>{post.title}</h3>
                                 <p className={styles.description}>{post.description}</p>
                              </div>
                           </Link>
                        ))}
                     </Slide>
                  </article>
               </div>
            </div>
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
