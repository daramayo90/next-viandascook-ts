import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { dbProducts } from '../database';
import { IProduct } from '../interfaces';

const SiteMap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
   const products = await dbProducts.getAllProducts();

   const xml = generateRssXml(products);

   res.setHeader('Content-Type', 'text/xml');
   res.write(xml);
   res.end();

   return {
      props: {},
   };
};

function generateRssXml(products: IProduct[]) {
   let rssItemsXml = '';
   products.forEach((product) => {
      rssItemsXml += `
      <item>
        <g:id>${product._id}</g:id>
        <g:title>${product.name}</g:title>
        <g:description>${product.description}</g:description>
        <link>https://www.viandascook.com/plato/${product.slug}</link>
        <g:image_link>${product.image}</g:image_link>
        <g:availability>${product.inStock ? 'in stock' : 'out of stock'}</g:availability>
        <g:price>${product.price} ARS</g:price>
        <g:condition>new</g:condition>
        <g:google_product_category>499988</g:google_product_category>
        <g:brand>Viandas Cook</g:brand>
      </item>`;
   });

   return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
         <title>Viandas Cook</title>
         <description>Viandas congeladas listas para consumir, con ingredientes saludables.</description>
         <link rel="self" href="https://www.viandascook.com" />
         ${rssItemsXml}
      </channel>
    </rss>`;
}

export default SiteMap;
