import { Accordion } from '.';
import { questions } from '../../utils';

import styles from '../../styles/Questions.module.css';

export const Questions = () => {
   return (
      <div className={styles.accordion}>
         {questions.map(({ title, content }) => (
            <Accordion key={title} title={title} content={content} />
         ))}
      </div>
   );
};
