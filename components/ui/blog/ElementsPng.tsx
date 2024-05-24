import Image from 'next/image';
import styles from '../../../styles/blog/ElementsPng.module.scss';
import { cloudBlogPath } from '../../../utils';

export const ElementsPng = () => {
   return (
      <>
         <div className={styles.redCircles}>
            <Image
               src={`${cloudBlogPath}/icons/vzlczjukwsznewralfpk`}
               alt='Círculos decorativos rojos'
               layout='fill'
            />
         </div>

         <div className={styles.lightGreenStain}>
            <Image
               src={`${cloudBlogPath}/icons/fwxbbiolunfimzlpwb1h`}
               alt='Mancha decorativa verde claro'
               layout='fill'
            />
         </div>

         <div className={styles.greenStain}>
            <Image
               src={`${cloudBlogPath}/icons/wpmxxamdckd2pjwlc2un`}
               alt='Mancha decorativa verde oscuro'
               layout='fill'
            />
         </div>

         <div className={styles.greenCircles}>
            <Image
               src={`${cloudBlogPath}/icons/qbhxno5gdnf4a6mcqjcx`}
               alt='Círculos decorativos veerdes'
               layout='fill'
            />
         </div>

         <div className={styles.redCircles2}>
            <Image
               src={`${cloudBlogPath}/icons/vzlczjukwsznewralfpk`}
               alt='Círculos decorativos rojos'
               layout='fill'
            />
         </div>
      </>
   );
};
