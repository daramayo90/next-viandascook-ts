import { signIn } from 'next-auth/react';

import { useAuth } from '../../hooks';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

import styles from '../../styles/Auth.module.css';

export const Providers = () => {
   const { providers } = useAuth();

   return (
      <div className={styles.providersContainer}>
         <div className={styles.providers}>
            {Object.values(providers).map((provider: any) => {
               if (provider.id === 'credentials') return <div key='credentials'></div>;

               if (provider.name === 'Google')
                  return (
                     <button
                        key={provider.id}
                        className={`${styles.providerButton} ${styles.google}`}
                        onClick={() => signIn(provider.id)}>
                        <FcGoogle className={styles.icon} />
                        <span>Loguearse con Google</span>
                     </button>
                  );

               return (
                  <button
                     key={provider.id}
                     className={`${styles.providerButton} ${styles.facebook}`}
                     onClick={() => signIn(provider.id)}>
                     <FaFacebookF className={styles.icon} />
                     <span className={styles.fbText}>Loguearse con Facebook</span>
                  </button>
               );
            })}
         </div>
      </div>
   );
};
