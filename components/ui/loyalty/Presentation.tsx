import { cloudImagesPath } from '../../../utils';
import styles from '../../../styles/loyalty/Loyalty.module.scss';
import Image from 'next/image';

export const Presentation = () => {
   return (
      <div className={styles.presentation}>
         <div className={styles.cellphoneImg}>
            <Image src={`${cloudImagesPath}/grwjsemh9ejzfit3vqt7`} alt={''} width={600} height={600} />
         </div>
         <div className={styles.container}>
            <p className={styles.text}></p>
            <p className={styles.text}>
               En <strong>Viandas Cook</strong> sabemos lo importante que es recompensar a nuestros
               clientes fieles.<br></br> Por eso, creamos <strong>VC Loyalty</strong>, nuestro programa
               de fidelización gratuito que te permite acumular puntos por cada compra que realices. Y
               no solo eso, también te ofrece beneficios exclusivos, como descuentos, cupones y puntos
               extra. ¡Sé un <strong>Viandlover</strong> y comenzá a disfrutar de comidas saludables y
               convenientes con más recompensas!
            </p>
         </div>
      </div>
   );
};
