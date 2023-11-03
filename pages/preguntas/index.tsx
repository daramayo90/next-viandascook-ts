import { NextPage } from 'next';
import { HomeLayout } from '../../components/layouts';
import { Newsletter, Questions } from '../../components/ui';

import { seo } from '../../utils';

import styles from '../../styles/Questions.module.css';

const QuestionsPage: NextPage = () => {
   const { title, description, keywords } = seo['QuestionsPage'];

   return (
      <HomeLayout title={title} pageDescription={description} keywords={keywords}>
         <section className={styles.questions}>
            <div className={styles.container}>
               <Questions />
               <Newsletter />
            </div>
         </section>
      </HomeLayout>
   );
};

export default QuestionsPage;
