import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

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
      <ShopLayout title={'Viandas Cook - Avatars'} pageDescription={''}>
         <section className={styles.avatars}>
            <p className={styles.title}>Seleccioná el Avatar para tu cuenta que más te guste</p>

            {avatars.map(({ name, img }) => (
               <Avatar key={name} name={name} img={img} avatar={avatar} select={onSelectAvatar} />
            ))}

            <div className={styles.applyBtn}>
               <SubmitButton content='Aplicar' onClick={onSubmit} isClicked={isClicked} />
            </div>
         </section>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const { user }: any = (await getSession({ req })) || '';

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
