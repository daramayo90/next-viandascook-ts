import { steps } from '../../utils';
import { Step } from './Step';

import styles from '../../styles/HowItWorks.module.css';

export const Steps = () => {
   return (
      <div className={styles.steps}>
         {steps.map(({ id, poster, title, text1, text2 }) => (
            <Step key={id} id={id} poster={poster} title={title} text1={text1} text2={text2} />
         ))}
      </div>
   );
};
