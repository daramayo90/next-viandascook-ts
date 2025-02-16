import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import { useRouter } from 'next/router';
import { viandasApi } from '../../axiosApi';

import { ShopLayout } from '../../components/layouts';
import { Avatar } from '../../components/account';
import { SubmitButton } from '../../components/ui';

import styles from '../../styles/Avatars.module.css';

const avatars = [
   {
      name: 'Avatar 1',
      img: '/avatars/VC-Avatars-01.png',
   },
   {
      name: 'Avatar 2',
      img: '/avatars/VC-Avatars-02.png',
   },
   {
      name: 'Avatar 3',
      img: '/avatars/VC-Avatars-03.png',
   },
   {
      name: 'Avatar 4',
      img: '/avatars/VC-Avatars-04.png',
   },
   {
      name: 'Avatar 5',
      img: '/avatars/VC-Avatars-05.png',
   },
   {
      name: 'Avatar 6',
      img: '/avatars/VC-Avatars-06.png',
   },
   {
      name: 'Avatar 7',
      img: '/avatars/VC-Avatars-07.png',
   },
   {
      name: 'Avatar 8',
      img: '/avatars/VC-Avatars-08.png',
   },
   {
      name: 'Avatar 9',
      img: '/avatars/VC-Avatars-09.png',
   },
   {
      name: 'Avatar 10',
      img: '/avatars/VC-Avatars-10.png',
   },
];

const AvatarsPage: NextPage = () => {
   const [isClicked, setIsClicked] = useState(false);
   const [avatar, setAvatar] = useState<string>('');

   const router = useRouter();

   const onSelectAvatar = (newAvatar: string) => {
      setAvatar(newAvatar);
   };

   const onSubmit = async () => {
      setIsClicked(true);
      const avatarData = { avatar };
      await viandasApi.put('/user/avatar', avatarData);
      router.push('/mi-cuenta');
   };

   return (
      <ShopLayout title={'Avatars | Viandas Cook'} pageDescription={''} noIndex>
         <section className={styles.avatars}>
            <p className={styles.title}>Seleccioná el Avatar para tu cuenta que más te guste</p>

            <div className={styles.container}>
               {avatars.map(({ name, img }) => (
                  <Avatar key={name} name={name} img={img} avatar={avatar} select={onSelectAvatar} />
               ))}
            </div>

            <div className={styles.applyBtn}>
               <SubmitButton content='Aplicar' onAsyncClick={onSubmit} isClicked={isClicked} />
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const { user }: any = (await getServerSession(req, res, authOptions)) || '';

   if (!user)
      return {
         redirect: {
            destination: '/auth/login?page=/mi-cuenta/avatars',
            permanent: false,
         },
      };

   return {
      props: {},
   };
};

export default AvatarsPage;
