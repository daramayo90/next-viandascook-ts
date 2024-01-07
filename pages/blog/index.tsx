import { NextPage } from 'next';
import Image from 'next/image';
import styles from '../../styles/Blog.module.css';
import { MainLayout } from '../../components/layouts';

const BlogPage: NextPage = () => {
   return (
      <MainLayout title={'Blog | Viandas Cook'} pageDescription={''} can={''}>
         <div className={styles.container}>
            <Image src='/logo/viandascook-logo.png' alt='Logo' width={400} height={100} />
            <h1 className={styles.title}>Próximamente</h1>
            <p className={styles.text}>Estamos trabajando para traerte algo increíble. ¡Esperalo!</p>
         </div>
      </MainLayout>
   );
};

export default BlogPage;
