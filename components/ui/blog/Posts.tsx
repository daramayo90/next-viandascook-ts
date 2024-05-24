import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import { IPost } from '../../../interfaces';
import { Button } from '../Button';

import styles from '../../../styles/blog/Blog.module.scss';

interface Props {
   posts: IPost[];
   useSlide?: boolean;
}

export const Posts: FC<Props> = ({ posts, useSlide = false }) => {
   const properties = {
      prevArrow: <FaChevronCircleLeft className={styles.sliderBtn} />,
      nextArrow: <FaChevronCircleRight className={styles.sliderBtn} />,
   };

   const postsContent = posts.map((post) => (
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
   ));

   return (
      <article className={styles.posts}>
         {useSlide ? (
            <Slide easing='ease' duration={5000} {...properties}>
               {postsContent}
            </Slide>
         ) : (
            <>{postsContent}</>
         )}
      </article>
   );
};
