import { sectionsUs } from '../../utils';
import { SectionUs } from './SectionUs';

import styles from '../../styles/Nosotros.module.css';

export const SectionsUs = () => {
   return (
      <div className={styles.sections}>
         {sectionsUs.map(({ id, poster, title, text }) => (
            <SectionUs key={id} id={id} poster={poster} title={title} text={text} />
         ))}
      </div>
   );
};
