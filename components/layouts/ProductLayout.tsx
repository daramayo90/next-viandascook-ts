import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Footer, SideMenu } from '../ui';
import { ShopNavbar } from '../navbar';
import { IProduct } from '../../interfaces';

interface Props {
   children: ReactNode;
   product: IProduct;
}

export const ProductLayout: FC<Props> = ({ children, product }) => {
   return (
      <>
         <Head>
            <title>{product.name} | Viandas Cook</title>
            <meta name='og:title' content={product.name} />

            <meta name='description' content={product.description} />
            <meta name='og:description' content={product.description} />

            <meta name='viewport' content='width=device-width' />
            <meta name='og:image' content={product.image} />

            {/* <script
               type='application/ld+json'
               dangerouslySetInnerHTML={addProductJsonLd(product)}
               key='product-jsonld'
            /> */}

            <script
               type='application/ld+json'
               dangerouslySetInnerHTML={addRecipeJsonLd(product)}
               key='recipe-jsonld'
            />
         </Head>
         <header>
            <nav>
               <ShopNavbar pageTitle={''} menuPage={false} backCart={false} />
            </nav>
         </header>

         <main>
            {children}
            <SideMenu />
         </main>

         <footer>
            <Footer />
         </footer>
      </>
   );
};

const addProductJsonLd = (product: IProduct) => {
   const { name, image, slug, description, price, updatedAt } = product;

   return {
      __html: `{
         "@context": "https://schema.org/",
         "@type": "Product",
         "name": "${name}",
         "image": "${image}",
         "description": "${description}",
         "brand": {
            "@type": "Brand",
            "name": "Viandas Cook"
         },
         "offers": {
            "@type": "Offer",
            "url": "https://www.viandascook.com/plato/${slug}",
            "priceCurrency": "ARS",
            "price": "${price}",
            "priceValidUntil": "${updatedAt}",
            "availability": "https://schema.org/OnlineOnly",
            "itemCondition": "https://schema.org/NewCondition"
         }
      }`,
   };
};

const addRecipeJsonLd = (product: IProduct) => {
   const { name, image, ingredients, howToHeat, description, createdAt } = product;
   const nutritionalInfo: any = product.nutritionalInfo;

   return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": "${name}",
        "image": "${image}",
        "description": "${description}",
        "datePublished": "${createdAt}",
        "keywords": "vianda, viandas, comida saludable, vianda saludable, vianda congelada, ${name}, ${description}",
        "author": {
          "@type": "Organization",
          "name": "Viandas Cook SRL"
        },
        "prepTime": "PT20M",
        "cookTime": "PT30M",
        "totalTime": "PT50M",
        "recipeYield": "1 serving",
        "recipeCategory": "main course",
        "recipeCuisine": "Argentina",
        "recipeIngredient": ${JSON.stringify(ingredients)},
        "recipeInstructions": [{
          "@type": "HowToStep",
          "text": "${howToHeat}"
        }],
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "${nutritionalInfo.Calorías}",
          "carbohydrateContent": "${nutritionalInfo.Carbohidratos}",
          "proteinContent": "${nutritionalInfo.Proteína}",
          "fiberContent": "${nutritionalInfo.Fibras}",
          "sodiumContent": "${nutritionalInfo.Sodio}",
          "fatContent": "${nutritionalInfo.Grasas}"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "ratingCount": "5"
        }
      }`,
   };
};
