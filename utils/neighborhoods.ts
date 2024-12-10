const neighborhoodsCABA = [
   'agronomia',
   'almagro',
   'balvanera',
   'barracas',
   'belgrano',
   'boedo',
   'caballito',
   'chacarita',
   'coghlan',
   'colegiales',
   'constitucion',
   'flores',
   'floresta',
   'la-boca',
   'liniers',
   'mataderos',
   'monserrat',
   'monte-castro',
   'nueva-pompeya',
   'palermo',
   'parque-avellaneda',
   'parque-chacabuco',
   'parque-chas',
   'parque-patricios',
   'paternal',
   'puerto-madero',
   'recoleta',
   'retiro',
   'saavedra',
   'san-cristobal',
   'san-nicolas',
   'san-telmo',
   'velez-sarsfield',
   'versalles',
   'villa-crespo',
   'villa-del-parque',
   'villa-devoto',
   'villa-gral-mitre',
   'villa-lugano',
   'villa-luro',
   'villa-ortuzar',
   'villa-pueyrredon',
   'villa-real',
   'villa-soldati',
   'villa-urquiza',
];

const neighborhoodsZonaNorte = [
   'san-isidro',
   'vicente-lopez',
   'san-martin',
   'martinez',
   'villa-adelina',
   'munro',
   'villa-martelli',
   'la-lucila',
   'olivos',
   'florida',
   'vicente-lopez',
];

const neighborhoodsZonaOeste = [
   'moron',
   'hurlingham',
   'ituzaingo',
   'tres-de-febrero',
   'caseros',
   'castelar',
   'ramos-mejia',
   'lomas-del-mirador',
   'haedo',
   'villa-sarmiento',
   'ciudadela',
   'el-palomar',
   'isidro-casanova',
   'san-justo',
];

export const neighborhoods = [
   ...neighborhoodsCABA,
   ...neighborhoodsZonaNorte,
   ...neighborhoodsZonaOeste,
];

export const slugToTitleCase = (slug: string): string => {
   return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

export const generateNeighborhoodSeo = (neighborhood: string) => {
   const titleCaseNeighborhood = neighborhood
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

   return {
      title: `Viandas Saludables en ${titleCaseNeighborhood} | ViandasCook ©`,
      description: `🍲 Viandas saludables en ${titleCaseNeighborhood}.  Opciones veganas y vegetarianas. ¡Comida casera y deliciosa a domicilio! Consultanos por variedad, precios y promociones.`,
      keywords: `viandas saludables en ${titleCaseNeighborhood}, entrega de viandas a domicilio, comida saludable a domicilio, menús saludables, viandas vegetarianas, viandas veganas, viandas a domicilio caba, viandas Cook, comida casera a domicilio, opciones veganas y vegetarianas`,
      canonical: `https://www.viandascook.com/barrio/${neighborhood}`,
   };
};
