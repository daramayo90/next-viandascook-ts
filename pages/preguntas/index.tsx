import { HomeLayout } from '../../components/layouts';
import { Questions } from '../../components/ui';

import styles from '../../styles/Questions.module.css';

const QuestionsPage = () => {
   return (
      <HomeLayout title={'¿Dudas? ¿Preguntas?'} pageDescription={''}>
         <section className={styles.questions}>
            <div className={styles.container}>
               <Questions />
            </div>
         </section>
      </HomeLayout>
   );
};

export default QuestionsPage;
