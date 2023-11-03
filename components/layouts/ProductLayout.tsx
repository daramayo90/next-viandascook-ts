import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { SideMenu } from '../ui';
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

            <meta
               name='description'
               content={`Disfruta de nuestro delicioso ${product.name} por solo $${product.price}.`}
            />
            <meta
               name='og:description'
               content={`Disfruta de nuestro delicioso ${product.name} por solo $${product.price}.`}
            />

            <meta name='viewport' content='width=device-width, user-scalable=no' />
            <meta name='og:image' content={product.image} />

            <script
               type='application/ld+json'
               dangerouslySetInnerHTML={addRecipeJsonLd(product)}
               key='recipe-jsonld'
            />
         </Head>

         <nav>
            <ShopNavbar pageTitle={''} menuPage={false} backCart={false} />
         </nav>

         <SideMenu />

         <main>{children}</main>
      </>
   );
};

const addRecipeJsonLd = (product: IProduct) => {
   const { name, image, ingredients, howToHeat, createdAt } = product;
   const nutritionalInfo: any = product.nutritionalInfo;

   return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": "${name}",
        "image": "${image}",
        "description": "",
        "datePublished": ${createdAt},
        "keywords": "vianda, viandas, comida saludable, vianda saludable, vianda congelada, ${name}",
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
