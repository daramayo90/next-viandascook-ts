import { MainLayout } from '../components/layouts';

import styles from '../styles/Error.module.css';

const Custom404 = () => {
   return (
      <MainLayout title='Página no encontrada' pageDescription='Nada que mostrar por acá'>
         <div className={styles.box}>
            <h1 className={styles.title}>404 |</h1>
            <h3 className={styles.text}>No encontramos nada por acá </h3>
         </div>
      </MainLayout>
   );
};

export default Custom404;
