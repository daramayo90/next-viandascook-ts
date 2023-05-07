import { GetServerSideProps } from 'next';
import { ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap';
import { dbProducts } from '../database';

const SiteMap = () => {
   return null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   const products = await dbProducts.getAllProducts();

   const fields: ISitemapField[] = products.map((product) => ({
      loc: `https://www.viandascook.com/plato/${product.slug}`,
      lastmod: new Date(product.updatedAt!).toISOString(),
   }));

   return getServerSideSitemapLegacy(ctx, fields);
};

export default SiteMap;
