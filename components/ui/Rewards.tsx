import { rewards } from '../../utils';
import { Reward } from './';

import styles from '../../styles/Loyalty.module.css';

export const Rewards = () => {
   return (
      <div className={styles.rewards}>
         {rewards.map(({ id, img, title, text }) => (
            <Reward key={id} img={img} title={title} text={text} />
         ))}
      </div>
   );
};
