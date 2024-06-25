import { useRef, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]';

import { dbUsers } from '../../database';

import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/referrals/Referrals.module.scss';
import Image from 'next/image';
import { cloudImagesPath } from '../../utils';

interface Props {
   userRefCode: string;
}

const FriendsPage: NextPage<Props> = ({ userRefCode }) => {
   const [couponToCopy, setCouponToCopy] = useState<string>('');
   const couponRef = useRef<HTMLSpanElement>(null);

   const handleCopyClick = (): void => {
      if (couponRef.current) {
         navigator.clipboard.writeText(couponRef.current.innerText);
         setCouponToCopy(couponRef.current.innerText);
      }
   };

   const handleClick = (): void => {
      const message = `Si usas mi código ${couponToCopy} en https://viandascook.com tenes 5% de descuento en tu primera compra (acumulable con otras promociones).`;
      const url = generateWhatsAppUrl(message);

      window.open(url, '_blank');
   };

   const generateWhatsAppUrl = (message: string): string => {
      const baseUrl = 'https://api.whatsapp.com/send';
      const text = encodeURIComponent(message);

      return `${baseUrl}?text=${text}`;
   };

   return (
      <ShopLayout title={'Referidos | Viandas Cook'} pageDescription={''} noIndex>
         <section className={styles.referrals}>
            <div className={styles.bannerMobile}>
               <Image
                  src={`${cloudImagesPath}/Referidos/qmeskorwpu3hbfiwcfp4`}
                  alt='Referidos - Banner'
                  layout='fill'
               />
            </div>

            <div className={styles.bannerDesktop}>
               <Image
                  src={`${cloudImagesPath}/Referidos/wcyo5z3fnij98a5tayei`}
                  alt='Referidos - Banner'
                  layout='fill'
               />
            </div>

            <div className={styles.container}>
               <h2 className={styles.titleMobile}>Invitá a un amigo a ser un ViandLover</h2>

               <div className={styles.friendsImg}>
                  <Image
                     src={`${cloudImagesPath}/Referidos/l891q2z7c5srkjfqtkrr`}
                     alt='Referidos - Amigos'
                     layout='fill'
                  />
               </div>

               <div className={styles.info}>
                  <h2 className={styles.titleDesktop}>Invitá a un amigo a ser un ViandLover</h2>

                  <p className={styles.text}>
                     Por cada amigo que haga su primer pedido con tu código, recibís{' '}
                     <strong>10.000 puntos</strong> de regalo y tu amigo recibe un{' '}
                     <strong>5% de descuento</strong> en su primera compra.
                  </p>

                  <p className={styles.text}>
                     ¡Con Viandas Cook, hacé que tus días y los de tus amigos tengan sabor!
                  </p>

                  <div className={styles.referralContainer}>
                     <span className={styles.coupon} ref={couponRef}>
                        {userRefCode}
                     </span>
                     <button className={styles.copy} onClick={handleCopyClick}>
                        <span className='fadeIn'>{couponToCopy ? 'Copiado' : 'Copiar'}</span>
                     </button>
                  </div>

                  <div className={styles.btn} onClick={handleClick}>
                     <button>Compartir</button>
                  </div>
               </div>
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const session: any = await getServerSession(req, res, authOptions);

   if (!session) {
      return {
         redirect: {
            destination: '/auth/login?page=/mi-cuenta/invitar-amigos',
            permanent: false,
         },
      };
   }
   const user = await dbUsers.getUser(session.user.email);

   if (!user) {
      return {
         redirect: {
            destination: '/auth/login?page=/mi-cuenta/invitar-amigos',
            permanent: false,
         },
      };
   }

   const userRefCode = user.referralCode;

   return {
      props: { userRefCode },
   };
};

export default FriendsPage;
