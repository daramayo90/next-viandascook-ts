import { FC } from 'react';
import { Posts } from './Posts';
import { IPost } from '../../../interfaces';
import styles from '../../../styles/blog/Blog.module.scss';

interface Props {
   posts: IPost[];
}

export const FeaturedPosts: FC<Props> = ({ posts }) => {
   return (
      <div className={styles.featuredPosts}>
         <h2 className={styles.title}>Artículos destacados</h2>
         <Posts posts={posts} useSlide />
      </div>
   );
};
