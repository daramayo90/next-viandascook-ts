import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { CartContext } from '../../context';
import { SubmitButton } from '../ui';

import { PromoCard } from './PromoCard';

import { MdLocalOffer } from 'react-icons/md';
import { RiUserFill } from 'react-icons/ri';
import { TbDiscount2 } from 'react-icons/tb';

import styles from '../../styles/Promos.module.css';

const promosList = [
   {
      icon: <RiUserFill className={styles.iconPromo} />,
      title: 'Nuevo Usuario',
      text: 'Válido para la primera compra',
      coupon: 'bienvenido10',
   },
   // {
   //    icon: <TbDiscount2 className={styles.iconPromo} />,
   //    title: 'Black Friday',
   //    text: '20% de descuento en todo el menú',
   //    coupon: 'black-viandas',
   // },
   // {
   //    icon: <RiUserFill className={styles.iconPromo} />,
   //    title: 'Promo día de la madre',
   //    text: '10% de descuento en todo el menú',
   //    coupon: 'felizdiamama',
   // },
   // {
   //    icon: <TbDiscount2 className={styles.iconPromo} />,
   //    title: 'Promo primavera',
   //    text: '10% de descuento en todo el menú',
   //    coupon: 'primavera',
   // },
   // {
   //    icon: <TbDiscount2 className={styles.iconPromo} />,
   //    title: 'Promo finde xl',
   //    text: '10% de descuento en todo el menú',
   //    coupon: 'findexl',
   // },
   // {
   //    icon: <TbDiscount2 className={styles.iconPromo} />,
   //    title: 'Promo día del amigo',
   //    text: '10% de descuento en todo el menú',
   //    coupon: 'diadelamigo',
   // },
   // {
   //    icon: <TbDiscount2 className={styles.iconPromo} />,
   //    title: 'Día del padre',
   //    text: '10% de descuento en todo el menú',
   //    coupon: 'papafeliz',
   // },
   // {
   //    icon: <TbDiscount2 className={styles.iconPromo} />,
   //    title: 'Hot Sale',
   //    text: '20% de descuento en todo el menú',
   //    coupon: 'hotviandas',
   // },
   // {
   //    icon: <TbDiscount2 className={styles.iconPromo} />,
   //    title: 'Cyber Monday',
   //    text: '20% de descuento en todo el menú',
   //    coupon: 'cyber-viandas',
   // },
   // {
   //    icon: <MdLocalOffer className={styles.iconPromo} />,
   //    title: 'Especial Fin de Semana',
   //    text: 'Válido para Sábados y Domingos',
   //    coupon: 'weekend-viandas',
   // },
   // {
   //    icon: <TbDiscount2 className={styles.iconPromo} />,
   //    title: 'Promo Fin de Año',
   //    text: 'Válido para Navidad y Año nuevo',
   //    coupon: 'newyear-viandas',
   // },
];

export const PromosList = () => {
   const router = useRouter();

   const { addCoupon } = useContext(CartContext);

   const [promo, setPromo] = useState('');
   const [errorMsg, setErrorMsg] = useState('');
   const [isClicked, setIsClicked] = useState(false);

   const onSelectPromo = (coupon: string) => {
      setPromo(coupon);
   };

   const onSubmit = async () => {
      setIsClicked(true);
      const { error, msg } = await addCoupon(promo);

      if (error) {
         setIsClicked(false);
         setErrorMsg(msg!);
         setTimeout(() => {
            setErrorMsg('');
         }, 2500);
         return;
      }

      setTimeout(() => {
         setErrorMsg('');
         router.push('/checkout');
      }, 1000);
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Solo es posible utilizar un cupón a la vez</h2>

         {promosList.map(({ icon, title, text, coupon }) => (
            <PromoCard
               key={coupon}
               icon={icon}
               title={title}
               text={text}
               coupon={coupon}
               promo={promo}
               select={onSelectPromo}
            />
         ))}

         {errorMsg && <span className={styles.error}>{errorMsg}</span>}

         <div className={styles.applyButton}>
            <SubmitButton content='Aplicar' onClick={onSubmit} isClicked={isClicked} />
         </div>
      </div>
   );
};
