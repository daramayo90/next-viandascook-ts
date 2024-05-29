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

            <meta property='og:title' content={title} />
            <meta property='og:description' content={pageDescription} />
            <meta property='og:image' content='/logo/viandas-icon.png' />
            <meta property='og:url' content={can} />
            <meta property='og:type' content='website' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={pageDescription} />
            <meta name='twitter:image' content='/logo/viandas-icon.png' />

            <meta name='viewport' content='width=device-width' />

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

         <header>
            <nav>
               <MainNavbar />
            </nav>
         </header>

         <main id='main'>
            {children}{' '}
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
