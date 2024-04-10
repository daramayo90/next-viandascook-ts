import { FC, useEffect, useState } from 'react';
import styles from '../../styles/CrossSelling.module.css';

export const CrossSelling: FC = () => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // const isPopupShown = localStorage.getItem('isPopupShown');
      setIsVisible(true);
   }, []);

   const handleClose = () => {
      //  localStorage.setItem('isPopupShown', 'true');
      setIsVisible(false);
   };

   if (!isVisible) return null;

   return (
      <div className={`${styles.popup} ${isVisible ? styles.show : ''}`}>
         {/* Popup content here */}
         <button onClick={handleClose}>No, gracias</button>
      </div>
   );
};
