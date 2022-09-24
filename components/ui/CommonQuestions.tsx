import Link from 'next/link';

import { Accordion, Button } from './';
import { commonQuestions } from '../../utils';

import styles from '../../styles/CommonQuestions.module.css';

export const CommonQuestions = () => {
   return (
      <section className={styles.commonFaqs}>
         <h2 className={styles.title}>Preguntas Frecuentes</h2>
         <div className={styles.accordion}>
            {commonQuestions.map(({ title, content }) => (
               <Accordion key={title} title={title} content={content} />
            ))}
         </div>

         <Button content='Ver Todas' color='var(--primary)' border='2px solid var(--primary)' />
      </section>
   );
};
