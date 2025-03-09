import { NextPage } from 'next';
import { MainLayout } from '../../components/layouts';
import { Newsletter, Questions } from '../../components/ui';

import { seo } from '../../utils';

import styles from './Questions.module.scss';

const QuestionsPage: NextPage = () => {
   const { title, description, keywords, canonical } = seo['QuestionsPage'];

   return (
      <MainLayout
         title={title}
         pageDescription={description}
         keywords={keywords}
         can={canonical}
         index>
         <section className={styles.questions}>
            <div className={styles.container}>
               <h1 className={styles.title}>
                  Resolvé todas tus dudas sobre nuestras viandas saludables
               </h1>
               <Questions />
               <Newsletter />
            </div>
         </section>
      </MainLayout>
   );
};

export default QuestionsPage;
