import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Legal.module.css';

const TermsAndConditionsPage: NextPage = () => {
   <Head>
      <meta name='viewport' content='width=device-width' />
      {/* <meta name='robots' content='noindex, nofollow' /> */}
   </Head>;

   return (
      <section className={styles.refundSection}>
         <h2 className={styles.header}>Términos y Condiciones</h2>

         <div className={styles.section}>
            <h3>Quiénes somos</h3>
            <p>La dirección de nuestra web es: https://viandascook.com.</p>
         </div>

         <div className={styles.section}>
            <h3>Comentarios</h3>
            <p>
               Cuando los visitantes dejan comentarios en la web, recopilamos los datos que se muestran
               en el formulario de comentarios, así como la dirección IP del visitante y la cadena de
               agentes de usuario del navegador para ayudar a la detección de spam. Una cadena anónima
               creada a partir de tu dirección de correo electrónico (también llamada hash) puede ser
               proporcionada al servicio de Gravatar para ver si la estás usando. La política de
               privacidad del servicio Gravatar está disponible aquí: https://automattic.com/privacy/.
               Después de la aprobación de tu comentario, la imagen de tu perfil es visible para el
               público en el contexto de tu comentario.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Medios</h3>
            <p>
               Si subes imágenes a la web, deberías evitar subir imágenes con datos de ubicación (GPS
               EXIF) incluidos. Los visitantes de la web pueden descargar y extraer cualquier dato de
               ubicación de las imágenes de la web.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Cookies</h3>
            <p>
               Si dejas un comentario en nuestro sitio puedes elegir guardar tu nombre, dirección de
               correo electrónico y web en cookies. Esto es para tu comodidad, para que no tengas que
               volver a rellenar tus datos cuando dejes otro comentario. Estas cookies tendrán una
               duración de un año. Si tienes una cuenta y te conectas a este sitio, instalaremos una
               cookie temporal para determinar si tu navegador acepta cookies. Esta cookie no contiene
               datos personales y se elimina al cerrar el navegador. Cuando accedas, también
               instalaremos varias cookies para guardar tu información de acceso y tus opciones de
               visualización de pantalla. Las cookies de acceso duran dos días, y las cookies de
               opciones de pantalla duran un año. Si seleccionas «Recuérdarme», tu acceso perdurará
               durante dos semanas. Si sales de tu cuenta, las cookies de acceso se eliminarán. Si
               editas o publicas un artículo se guardará una cookie adicional en tu navegador. Esta
               cookie no incluye datos personales y simplemente indica el ID del artículo que acabas de
               editar. Caduca después de 1 día.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Contenido incrustado de otros sitios web</h3>
            <p>
               Los artículos de este sitio pueden incluir contenido incrustado (por ejemplo, vídeos,
               imágenes, artículos, etc.). El contenido incrustado de otras webs se comporta
               exactamente de la misma manera que si el visitante hubiera visitado la otra web. Estas
               web pueden recopilar datos sobre ti, utilizar cookies, incrustar un seguimiento
               adicional de terceros, y supervisar tu interacción con ese contenido incrustado,
               incluido el seguimiento de tu interacción con el contenido incrustado si tienes una
               cuenta y estás conectado a esa web.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Con quién compartimos tus datos</h3>
            <p>
               Si solicitas un restablecimiento de contraseña, tu dirección IP será incluida en el
               correo electrónico de restablecimiento.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Cuánto tiempo conservamos tus datos</h3>
            <p>
               Si dejas un comentario, el comentario y sus metadatos se conservan indefinidamente. Esto
               es para que podamos reconocer y aprobar comentarios sucesivos automáticamente, en lugar
               de mantenerlos en una cola de moderación. De los usuarios que se registran en nuestra
               web (si los hay), también almacenamos la información personal que proporcionan en su
               perfil de usuario. Todos los usuarios pueden ver, editar o eliminar su información
               personal en cualquier momento (excepto que no pueden cambiar su nombre de usuario). Los
               administradores de la web también pueden ver y editar esa información.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Qué derechos tienes sobre tus datos</h3>
            <p>
               Si tienes una cuenta o has dejado comentarios en esta web, puedes solicitar recibir un
               archivo de exportación de los datos personales que tenemos sobre ti, incluyendo
               cualquier dato que nos hayas proporcionado. También puedes solicitar que eliminemos
               cualquier dato personal que tengamos sobre ti. Esto no incluye ningún dato que estemos
               obligados a conservar con fines administrativos, legales o de seguridad.
            </p>
         </div>

         <div className={styles.section}>
            <h3>Dónde enviamos tus datos</h3>
            <p>
               Los comentarios de los visitantes puede que los revise un servicio de detección
               automática de spam.
            </p>
         </div>
      </section>
   );
};

export default TermsAndConditionsPage;
