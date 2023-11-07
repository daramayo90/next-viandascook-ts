import { GetServerSideProps } from 'next';
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
        <id>${product._id}</id>
        <title>${product.name}</title>
        <description>${product.description}</description>
        <availability>${product.inStock ? 'in stock' : 'out of stock'}</availability>
        <condition>new</condition>
        <price>${product.price} ARS</price>
        <link>https://www.viandascook.com/plato/${product.slug}</link>
        <image_link>${product.image}</image_link>
        <google_product_category>499988</google_product_category>
        <brand>Viandas Cook</brand>
      </item>`;
   });

   return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        ${rssItemsXml}
      </channel>
    </rss>`;
}

export default SiteMap;
