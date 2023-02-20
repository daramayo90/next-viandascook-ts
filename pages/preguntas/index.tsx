import { HomeLayout } from '../../components/layouts';
import { Newsletter, Questions } from '../../components/ui';

import styles from '../../styles/Questions.module.css';

const QuestionsPage = () => {
   return (
      <HomeLayout title={'Viandas Cook - ¿Dudas?'} pageDescription={''}>
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
