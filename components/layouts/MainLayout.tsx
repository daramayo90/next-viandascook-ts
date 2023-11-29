import { FC, ReactNode, Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Footer } from '../ui';
import { MainNavbar, Navbar } from '../navbar';

const SideMenu = dynamic(() => import('../ui').then((module) => module.SideMenu), {
   ssr: false,
});

interface Props {
   children: ReactNode;
   title: string;
   pageDescription: string;
   can: string;
   keywords?: string;
   imageFullUrl?: string;
}

export const MainLayout: FC<Props> = ({
   children,
   title,
   pageDescription,
   keywords,
   can,
   imageFullUrl,
}) => {
   const router = useRouter();

   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name='description' content={pageDescription} />
            <meta name='keywords' content={keywords} />

            <meta name='og:title' content={title} />
            <meta name='og:description' content={pageDescription} />
            <meta name='viewport' content='width=device-width' />

            {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}

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
         </Head>

         <nav>
            {router.asPath === '/' || router.asPath === '/sitemap' ? <MainNavbar /> : <Navbar />}
         </nav>

         <Suspense>
            <SideMenu />
         </Suspense>

         <main id='main'>{children}</main>

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
