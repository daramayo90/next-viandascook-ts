import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { getMatterPostResult, getMatterResult } from '../../plugins';
import { markdownToHtml } from '../../lib/markdownToHtml';
import { fileNames, removeDateIndex, removeMdExtension } from '../../lib/posts';

import { IPost } from '../../interfaces';

import { MainLayout } from '../../components/layouts';
import { ElementsPng } from '../../components/ui/blog';

import styles from '../../styles/blog/Post.module.scss';
import { Newsletter } from '../../components/ui/Newsletter';

interface Props {
   post: IPost;
}

const Post: NextPage<Props> = ({ post }) => {
   const title = `${post.title} | Viandas Cook`;
   const description = post.description!;
   const canonical = `https://www.viandascook.com/blog/${post.id}`;

   return (
      <MainLayout title={title} pageDescription={description} can={canonical} index>
         <section className={styles.post}>
            {/* <div className={styles.banner}>
               <h2 className={styles.mobileTitle}>
                  El Blog de <br></br>Viandas Cook
               </h2>
               <h2 className={styles.title}>El Blog de Viandas Cook</h2>
            </div> */}

            <div className={styles.image}>
               <Image src={post.cover!} alt={post.title} layout='fill' />
            </div>

            <div className={styles.container}>
               <p className={styles.date}>{post.date}</p>
               <h1 className={styles.title}>{post.title}</h1>
               <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content! }} />
            </div>

            <ElementsPng />

            <Newsletter />
         </section>
      </MainLayout>
   );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
   const paths = fileNames.map((filename) => {
      const post = removeDateIndex(filename);

      return { params: { post } };
   });

   return {
      paths,
      fallback: true,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { post = '' } = params as { post: string };

   const { data, content } = getMatterPostResult(post);

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
