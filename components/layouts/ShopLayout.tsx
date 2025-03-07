import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Footer, SideMenu, TabMenu } from '../ui';
import { Navbar } from '../navbar';
import { pageTitles } from '../../utils';
import { CartSummary } from '../checkout';

interface Props {
   children: ReactNode;
   title: string;
   pageDescription: string;
   can?: string;
   keywords?: string;
   imageFullUrl?: string;
   noIndex?: boolean;
}

export const ShopLayout: FC<Props> = ({
   children,
   title,
   pageDescription,
   can,
   keywords,
   imageFullUrl,
   noIndex,
}) => {
   const router = useRouter();
   const path = router.pathname;

   let navTitle = '';
   let menuPage = false;
   let backCart = false;

   const hasFooter = path.includes('checkout');

   const setPath = (routerPath: string) => {
      Object.entries(pageTitles).forEach(([path, title]): void => {
         if (routerPath === path) navTitle = title;
         if (routerPath === '/menu') menuPage = true;
         if (routerPath === '/cart') backCart = true;
      });
   };

   setPath(path);

   return (
      <>
         <Head>
            <title>{title}</title>
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

            <meta name='viewport' content='width=device-width, user-scalable=no, maximum-scale=5' />

            <meta name='robots' content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

            <link rel='canonical' href={can} />

            {path === '/descuentos' && (
               <script
                  type='application/ld+json'
                  dangerouslySetInnerHTML={addOfferJsonLd()}
                  key='offer-jsonld'
               />
            )}
         </Head>
         <header>
            <nav>
               <Navbar />
            </nav>
         </header>
         <main>
            {children}
            {path.includes('checkout') ? <CartSummary /> : <TabMenu />}
            <SideMenu />
         </main>
         {!hasFooter && (
            <footer>
               <Footer />
            </footer>
         )}
      </>
   );
};

const addOfferJsonLd = () => {
   return {
      __html: `{
         "@context": "https://schema.org",
         "url": "https://www.viandascook.com/descuentos",
         "priceCurrency": "ARS",
         "offers": [
            {
               "@type": "Offer",
               "description": "Envío gratis llevando 14 viandas o más",
               "availability": "http://schema.org/InStock",
               "priceCurrency": "ARS",
               "url": "https://www.viandascook.com/_next/image?url=%2Fdiscounts%2Foffer-14-viandas.png&w=640&q=75"
            },
            {
               "@type": "Offer",
               "description": "10% de descuento llevando 28 viandas o más",
               "availability": "http://schema.org/InStock",
               "priceCurrency": "ARS",
               "url": "https://www.viandascook.com/_next/image?url=%2Fdiscounts%2Foffer-28-viandas.png&w=640&q=75",
            },
            {
               "@type": "Offer",
               "description": "15% de descuento llevando 56 viandas o más",
               "availability": "http://schema.org/InStock",
               "priceCurrency": "ARS",
               "url": "https://www.viandascook.com/_next/image?url=%2Fdiscounts%2Foffer-56-viandas.png&w=640&q=75",
            },
            {
               "@type": "Offer",
               "description": "10% de descuento primera compra (cupón: bienvenido10)",
               "availability": "http://schema.org/InStock",
               "priceCurrency": "ARS"
            }
         ],
         "itemOffered": {
            "@type": "Product",
            "name": "Viandas",
            "url": "https://www.viandascook.com/menu"
         }
      }`,
   };
};
