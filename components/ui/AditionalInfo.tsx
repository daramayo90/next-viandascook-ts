import styles from '../../styles/AditionalInfo.module.css';
import { Button } from './Button';

export const AditionalInfo = () => {
   return (
      <div className={styles.aditionalInfo}>
         <div className={styles.container}>
            <div className={styles.info}>
               <h3 className={styles.title}>¿Cómo hago mi pedido en Viandas Cook?</h3>
               <ul className={styles.list}>
                  <li>
                     Ingresá a nuestra web y creá tu usuario en la sección <strong>Registrarse</strong>{' '}
                     (o hacé tu pedido sin registrarte).
                  </li>
                  <li>Elegí los platos que quieras y sumalos a tu carrito.</li>
                  <li>Seleccioná el día que lo querés recibir.</li>
                  <li>Pagá con el medio que prefieras.</li>
                  <li style={{ fontWeight: 500 }}>¡Es fácil y rápido!</li>
               </ul>
            </div>

            <div className={styles.info}>
               <h3 className={styles.title}>Flexibilidad en tus pedidos</h3>
               <ul className={styles.list}>
                  <li>Nos adaptamos a tu estilo de vida y necesidades.</li>
                  <li>Podés hacer tu pedido con un mínimo de 48 horas de anticipación.</li>
                  <li>Seleccioná la fecha de entrega que mejor te convenga.</li>
                  <li>Si surge algún cambio, podés cancelar tu pedido hasta 24 horas antes.</li>
                  {/* <li>Disfrutá de descuentos especiales al comprar 14, 28 o 56 viandas.</li> */}
                  <li>Disfrutá de descuentos especiales al comprar 28 o 56 viandas.</li>
                  <li style={{ fontWeight: 500 }}>¡Tu comodidad es nuestra prioridad!</li>
               </ul>
            </div>
         </div>

         <div className={styles.btn}>
            <Button
               href={'/menu'}
               content={'Ver el Menú'}
               background='var(--secondary)'
               color='white'
            />
         </div>
      </div>
   );
};
