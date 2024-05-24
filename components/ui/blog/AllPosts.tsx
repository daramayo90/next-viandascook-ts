import { FC } from 'react';
import { Posts } from './Posts';
import { IPost } from '../../../interfaces';
import styles from '../../../styles/blog/Blog.module.scss';

interface Props {
   posts: IPost[];
}

export const AllPosts: FC<Props> = ({ posts }) => {
   return (
      <div className={styles.allPosts}>
         <h2 className={styles.title}>Todos los artículos</h2>
         <Posts posts={posts} />
      </div>
   );
};
