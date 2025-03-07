import { FC, ReactNode, Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Footer } from '../ui';
import { Navbar } from '../navbar';

const SideMenu = dynamic(() => import('../ui').then((module) => module.SideMenu), {
   ssr: false,
});

interface Props {
   children: ReactNode;
   title: string;
   pageDescription: string;
   can: string;
   keywords?: string;
   index: boolean;
}

export const MainLayout: FC<Props> = ({ children, title, pageDescription, keywords, can, index }) => {
   const router = useRouter();
   const path = router.asPath;

   return (
      <>
         <Head>
            <title>{title}</title>

            <meta name='viewport' content='width=device-width' />
            <meta name='robots' content={index ? 'index, follow' : 'noindex, nofollow'} />

            <meta name='description' content={pageDescription} />
            <meta name='keywords' content={keywords} />

            <meta name='og:title' content={title} />
            <meta name='og:description' content={pageDescription} />
            <meta name='og:image' content='/logo/viandas-icon.png' />

            <meta property='og:title' content={title} />
            <meta property='og:description' content={pageDescription} />
            <meta property='og:image' content='/logo/viandas-icon.png' />
            <meta property='og:url' content={can} />
            <meta property='og:type' content='website' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={pageDescription} />
            <meta name='twitter:image' content='/logo/viandas-icon.png' />

            <link rel='canonical' href={can} />

            <script
               type='application/ld+json'
               dangerouslySetInnerHTML={addOrganizationJsonLd()}
               key='organization-jsonld'
            />

            <script
               type='application/ld+json'
               dangerouslySetInnerHTML={addWebsiteJsonLd()}
               key='website-jsonld'
            />

            {path === '/preguntas' && (
               <script
                  type='application/ld+json'
                  dangerouslySetInnerHTML={addQuestionsJsonLd()}
                  key='questions-jsonld'
               />
            )}
         </Head>

         <header>
            <nav>
               <Navbar />
            </nav>
         </header>

         <main id='main'>
            {children}
            <Suspense>
               <SideMenu />
            </Suspense>
         </main>

         <footer>
            <Footer />
         </footer>
      </>
   );
};

const addOrganizationJsonLd = () => {
   return {
      __html: `{
         "@context": "https://schema.org",
         "@type": "Organization",
         "name": "Viandas Cook",
         "alternateName": "Viandas Cook, Viandas saludables",
         "url": "https://www.viandascook.com/",
         "logo": "https://www.viandascook.com/_next/image?url=%2Flogo%2Fviandascook-logo.png&w=1920&q=75",
         "sameAs": [
            "https://instagram.com/viandascook",
            "https://facebook.com/viandas.cook"
         ]
      }`,
   };
};

const addWebsiteJsonLd = () => {
   return {
      __html: `{
         "@context": "https://schema.org/",
         "@type": "WebSite",
         "name": "Viandas Cook",
         "url": "https://www.viandascook.com/",
         "potentialAction": {
            "@type": "SearchAction",
            "target": "{search_term_string}",
            "query-input": "required name=search_term_string"
         }
      }`,
   };
};

const addQuestionsJsonLd = () => {
   return {
      __html: `{
         "@context": "https://schema.org",
         "@type": "FAQPage",
         "mainEntity": [{
            "@type": "Question",
            "name": "¿Cuáles son las opciones de menú?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Ofrecemos platos basados en carnes, pescados, pastas, tartas y empanadas, wraps, y menúes vegetarianos y ovolácteos. En nuestra web la sección de cada menú está diferenciada y podrás encontrarla fácilmente, incluidos con sus aportes nutricionales."
            }
         },{
            "@type": "Question",
            "name": "¿Qué es el envasado al vacío?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Las viandas se envían envasadas al vacío, el cual es un proceso en el que se retira el aire que existe en el interior de un envase dejándolo vacío. De esta manera, se garantiza un espacio seguro y libre de microorganismos que necesitan oxígeno para sobrevivir y se retarda la oxidación y descomposición de los alimentos. El envasado al vacío permite mantener las propiedades químicas y las cualidades organolépticas (color, aroma y sabor) de los alimentos."
            }
         },{
            "@type": "Question",
            "name": "¿Cuánto tiempo duran las viandas?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Las viandas se pueden conservar hasta tres meses en el freezer o 72 horas en heladera."
            }
         },{
            "@type": "Question",
            "name": "¿Cómo caliento mis viandas?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "La forma óptima para calentar las viandas es ponerlas en una olla de agua hirviendo, esperar 15 minutos y sacarlas de la olla. Una vez afuera, se corta la bolsa y se sirven en cualquier plato. Otra forma de calentarlas es cortar la bolsa una vez retiradas del freezer y poner las viandas en un recipiente apto microondas (el tiempo dependerá de la potencia del microondas)."
            }
         },{
            "@type": "Question",
            "name": "¿Cuánto lugar ocupan en el freezer?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "En un freezer normal deberían entrar sin problemas 20 viandas envasadas al vacío."
            }
         },{
            "@type": "Question",
            "name": "¿Cuánto pesan las viandas?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Son porciones individuales que varían según el menú pero van de 350 a 450g."
            }
         },{
            "@type": "Question",
            "name": "¿Realizan viandas para niños o bebés?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Por el momento no realizamos menúes pensados especialmente para niños/bebes. En nuestra web www.viandascook.com encontraras cada vianda con sus ingredientes y aporte nutricional."
            }
         },{
            "@type": "Question",
            "name": "¿Venden packs o combos armados de viandas?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Las viandas se comercializan de forma individual y podes armar tu pedido o pack como desees. En caso que quieras comprar en cantidad, podrás aplicar los descuentos vigentes actuales dependiendo del número de viandas que compraste."
            }
         },{
            "@type": "Question",
            "name": "¿Cómo hago mi pedido?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Ingresá en nuestra web y creá tu usuario en la sección “Registrarse”. (También podes hacer pedido sin registro) Luego, elegís los platos que quieras y se van a ir sumando a tu carrito. Por último seleccioná qué día lo querés recibir y realizá tu pago con el medio que prefieras."
            }
         },{
            "@type": "Question",
            "name": "¿Existe una compra mínima de viandas?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Podes adquirir la cantidad de viandas que prefieras, ya que no tenemos una compra mínima. Podes elegir los platos que más te gusten y armar tu pedido como quieras. Estos son los descuentos vigentes: 10% ingresando el código BIENVENIDO10 , Envío gratis llevando 14 viandas o más, 10% llevando 28 viandas o más, y 15% llevando 56 viandas o más."
            }
         },{
            "@type": "Question",
            "name": "¿Con cuánta anticipación tengo que hacer mi pedido?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Los pedidos los recibimos con un mínimo de 48 horas de anticipación, más que nada para llegar a prepararlos correctamente. Al finalizar tu compra, podrás seleccionar la fecha de entrega que más te convenga entre las disponibles para tu domicilio, dependiendo de la demanda que haya."
            }
         },{
            "@type": "Question",
            "name": "¿En qué zonas realizan las entregas?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Nuestro servicio de viandas a domicilio llega a todo Capital Federal, Zona Norte y Zona Oeste."
            }
         },{
            "@type": "Question",
            "name": "¿Cuál es el horario de envío?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Las entregas se realizan de lunes a viernes de 20 a 23hs. Además, contamos con un servicio de seguimiento en tiempo real del delivery. Recibirás el link por mail y por mensaje de texto."
            }
         },{
            "@type": "Question",
            "name": "¿Cuál es el costo de envío?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "El costo de envío es de $1700 para CABA, $2100 para alguas zonas de GBA y Zona Norte."
            }
         },{
            "@type": "Question",
            "name": "¿Cómo debo aplicar el cupón BIENVENIDO10?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Para aplicar el cupón de descuento BIENVENIDO10 deberás ingresar en nuestra web www.viandascook.com y seleccionar los platos que quieras. Luego, haz click en finalizar y registrate para completar tu pedido. En la sección ver descuentos disponibles podrás aplicar este cupón. Solo es válido para la primera compra."
            }
         },{
            "@type": "Question",
            "name": "¿Qué medios de pago aceptan?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Podés abonar con tarjeta de crédito o débito utilizando Mercado Pago al momento de finalizar la compra, por transferencia bancaria o al contado al recibir las viandas."
            }
         },{
            "@type": "Question",
            "name": "¿Cómo hago para cancelar mi pedido?",
            "acceptedAnswer": {
               "@type": "Answer",
               "text": "Permitimos cancelaciones de pedidos hasta 24 horas antes, ya que todos son preparados especialmente. Si necesitás hacerlo, escribinos por WhatsApp o por mail indicando tu número de pedido."
            }
         }]
      }`,
   };
};
