import { GetServerSideProps } from 'next';
import { ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap';
import { dbProducts } from '../database';
import { IProduct } from '../interfaces';

const SiteMap = () => {
   return null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   const products = await dbProducts.getAllProducts();

   const fields: ISitemapField[] = products.map((product: IProduct) => ({
      id: product._id,
      title: product.name,
      description: product.name,
      availability: product.inStock ? 'in stock' : 'out of stock',
      condition: 'new',
      price: product.price,
      link: `https://www.viandascook.com/plato/${product.slug}`,
      image_link: product.image,
      brand: 'Viandas Cook',
      loc: `https://www.viandascook.com/plato/${product.slug}`,
      lastmod: new Date(product.updatedAt!).toISOString(),
   }));

   return getServerSideSitemapLegacy(ctx, fields);
};

export default SiteMap;
