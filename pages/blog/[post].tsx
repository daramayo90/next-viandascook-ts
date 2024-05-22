import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getMatterResult } from '../../plugins';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { fileNames, removeMdExtension } from '../../lib/posts';

import { IPost } from '../../interfaces';

import styles from '../../styles/blog/Post.module.scss';
import { HomeLayout } from '../../components/layouts';
import Image from 'next/image';

interface Props {
   post: IPost;
}

const Post: NextPage<Props> = ({ post }) => {
   return (
      <HomeLayout title={'Blog | Viandas Cook'} pageDescription={''} can={''}>
         <section className={styles.post}>
            <div className={styles.banner}>
               <h1 className={styles.mobileTitle}>
                  El Blog de <br></br>Viandas Cook
               </h1>
               <h1 className={styles.title}>El Blog de Viandas Cook</h1>
            </div>
            <div className={styles.image}>
               <Image src={post.cover!} alt={post.title} layout='fill' />
            </div>
            <div className={styles.container}>
               <p className={styles.date}>{post.date}</p>
               <h1 className={styles.title}>{post.title}</h1>
               <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content! }} />
            </div>
         </section>
      </HomeLayout>
   );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
   const paths = fileNames.map((filename) => {
      const post = removeMdExtension(filename);
      return { params: { post } };
   });

   return {
      paths,
      fallback: false,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { post = '' } = params as { post: string };

   const { data, content } = getMatterResult(post, true);

   const contentHtml = await markdownToHtml(content);

   return {
      props: {
         post: {
            ...data,
            content: contentHtml,
         },
      },
   };
};
