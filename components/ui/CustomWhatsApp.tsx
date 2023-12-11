import { FC } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import styles from '../../styles/CustomWhatsApp.module.css';

export const CustomWhatsApp: FC = () => {
   const phoneNumber = '+5491171080193';

   const handleClick = () => {
      const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=Hola 👋.. tengo una consulta sobre: `;
      window.open(url, '_blank');
   };

   return (
      <div className={styles.whatsappButton} onClick={handleClick}>
         <BsWhatsapp className={styles.icon} />
      </div>
   );
};
