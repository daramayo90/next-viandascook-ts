import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Legal.module.css';

const RefundsAndReturnsPage: NextPage = () => {
   <Head>
      <meta name='viewport' content='width=device-width, user-scalable=no' />
      {/* <meta name='robots' content='noindex, nofollow' /> */}
   </Head>;

   return (
      <section className={styles.refundSection}>
         <h2 className={styles.header}>Política de Reembolsos y Devoluciones de Viandas Cook</h2>

         <div className={styles.section}>
            <h3>Bienvenido a Viandas Cook!</h3>
            <p>
               En Viandas Cook, nos esforzamos por ofrecerte comidas saludables, prácticas y deliciosas
               que faciliten tu vida. Valoramos la satisfacción de nuestros clientes y entendemos que a
               veces las cosas no salen como se planearon. Por eso, hemos establecido la siguiente
               política de reembolsos y devoluciones.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Devoluciones</h3>
            <p>
               Debido a la naturaleza de nuestros productos alimenticios congelados y envasados al
               vacío, no podemos aceptar devoluciones una vez que los productos han sido entregados.
               Sin embargo, si encuentras algún problema con tu pedido, como un daño o error en los
               productos recibidos, por favor contáctanos dentro de las 24 horas siguientes a la
               entrega para solucionar el problema.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Cancelaciones</h3>
            <p>
               Entendemos que los planes pueden cambiar. Puedes cancelar tu pedido sin costo alguno
               hasta 24 horas antes de la fecha de entrega programada. Las cancelaciones después de
               este período no serán elegibles para un reembolso, ya que tus viandas se preparan
               específicamente para tu pedido.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Reembolsos</h3>
            <p>
               En casos excepcionales, como problemas con la calidad o errores en la entrega que sean
               responsabilidad de Viandas Cook, se evaluará la posibilidad de ofrecer un reembolso
               total o parcial. Los reembolsos se realizarán a través del mismo método de pago
               utilizado en la compra y pueden tardar hasta 10 días hábiles en procesarse.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Pasos para Solicitar un Reembolso o Reportar un Problema</h3>
            <p>
               <strong>1. Contacto:</strong> Escríbenos a nuestro correo electrónico o a través de
               WhatsApp indicando tu número de pedido y detallando el problema.
            </p>
            <p>
               <strong>2. Evaluación:</strong> Evaluaremos tu caso individualmente y nos pondremos en
               contacto contigo para encontrar la mejor solución.{' '}
            </p>
            <p>
               <strong>3. Resolución:</strong> En caso de aplicar un reembolso, procesaremos la
               devolución del importe correspondiente según nuestra política.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Preguntas Frecuentes</h3>
            <ul>
               <li>
                  <p>
                     <strong>¿Qué sucede si no estoy en casa durante la entrega?</strong>
                  </p>
                  <p>
                     Si no estás disponible en el horario de entrega, por favor avísanos con
                     anticipación para reprogramar la entrega. Si no se nos informa y el pedido no
                     puede ser entregado, no será posible realizar un reembolso.
                  </p>
               </li>
               <li>
                  <p>
                     <strong>¿Puedo cambiar mi pedido después de haberlo realizado?</strong>
                  </p>
                  <p>
                     Las modificaciones en los pedidos pueden realizarse hasta 24 horas antes de la
                     entrega programada.
                  </p>
               </li>
            </ul>
         </div>

         <div className={styles.footer}>
            <p>
               Agradecemos tu preferencia y confianza en Viandas Cook. ¡Estamos aquí para asegurar que
               disfrutes de comidas deliciosas y saludables cada día!
            </p>
         </div>
      </section>
   );
};

export default RefundsAndReturnsPage;
