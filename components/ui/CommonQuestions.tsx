import { Accordion, Button } from '.';
import styles from './styles/CommonQuestions.module.scss';

const commonQuestions = [
   {
      title: '¿Cómo hago mi pedido en Viandas Cook?',
      content: `Ingresá en nuestra web y creá tu usuario en la sección “Registrarse”. (También podes hacer pedido sin registro) Luego, elegís los platos que quieras y se van a ir sumando a tu carrito. Por último seleccioná qué día lo querés recibir y realizá tu pago con el medio que prefieras.`,
   },
   {
      title: '¿Cómo funcionan nuestros packs de viandas?',
      content: `Las viandas se comercializan de forma individual y podes armar tu pedido o pack como desees. En caso que quieras comprar en cantidad, podrás aplicar los descuentos vigentes actuales dependiendo del número de viandas que compraste.`,
   },
   {
      title: '¿Qué es el envasado al vacío y cómo beneficia a tus viandas?',
      content: `Las viandas se envían envasadas al vacío, el cual es un proceso en el que se retira el aire que existe en el interior de un envase dejándolo vacío. De esta manera, se garantiza un espacio seguro y libre de microorganismos que necesitan oxígeno para sobrevivir y se retarda la oxidación y descomposición de los alimentos. El envasado al vacío permite mantener las propiedades químicas y las cualidades organolépticas (color, aroma y sabor) de los alimentos.`,
   },
   {
      title: '¿Cómo calentar tus viandas congeladas correctamente?',
      content: `La forma óptima para calentar las viandas es ponerlas en una olla de agua hirviendo, esperar 15 minutos y sacarlas de la olla. Una vez afuera, se corta la bolsa y se sirven en cualquier plato. Otra forma de calentarlas es cortar la bolsa una vez retiradas del freezer y poner las viandas en un recipiente apto microondas (el tiempo dependerá de la potencia del microondas).`,
   },
   {
      title: '¿Cuál es el horario de envío?',
      content: `Las entregas se realizan de lunes a viernes de 20 a 23hs. Además, contamos con un servicio de seguimiento en tiempo real del delivery. Recibirás el link por mail y por mensaje de texto.`,
   },
];

export const CommonQuestions = () => {
   return (
      <section className={styles.commonFaqs}>
         <h2 className={styles.title}>Preguntas Frecuentes</h2>

         <div className={styles.accordion}>
            {commonQuestions.map(({ title, content }) => (
               <Accordion key={title} title={title} content={content} />
            ))}
         </div>

         <div className={styles.btn}>
            <Button
               href='/preguntas'
               content='Ver Todas las Preguntas'
               color='var(--black)'
               border='2px solid var(--black)'
            />
         </div>
      </section>
   );
};
