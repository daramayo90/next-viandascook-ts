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
   {
      icon: <TbDiscount2 className={styles.iconPromo} />,
      title: 'Cyber Monday',
      text: '20% de descuento en todo el menú',
      coupon: 'cyber-viandas',
   },
   {
      icon: <MdLocalOffer className={styles.iconPromo} />,
      title: 'Especial Fin de Semana',
      text: 'Válido para Sábados y Domingos',
      coupon: 'weekend-viandas',
   },
   {
      icon: <TbDiscount2 className={styles.iconPromo} />,
      title: 'Promo Fin de Año',
      text: 'Válido para Navidad y Año nuevo',
      coupon: 'newyear-viandas',
   },
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
         setErrorMsg(msg!);
         setIsClicked(false);
         return;
      }

      setErrorMsg('');
      router.push('/checkout');
   };

   return (
      <div className={styles.container}>
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
