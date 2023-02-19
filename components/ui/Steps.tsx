import { steps } from '../../utils';
import { Step } from './Step';

import styles from '../../styles/HowItWorks.module.css';

export const Steps = () => {
   return (
      <div className={styles.steps}>
         {steps.map(({ id, poster, source, title, text1, text2 }) => (
            <Step
               key={id}
               id={id}
               poster={poster}
               source={source}
               title={title}
               text1={text1}
               text2={text2}
            />
         ))}
      </div>
   );
};
