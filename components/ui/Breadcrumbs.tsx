import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Breadcrumbs.module.css';

const breadcrumbNameMap: { [key: string]: string } = {
   '/menu': 'Menu',
   '/plato': 'Vianda',
   '/loyalty': 'Sumá Puntos',
   '/nosotros': 'Nosotros',
   '/como-funciona': '¿Como Funciona?',
   '/preguntas': '¿Preguntas?',
};

export const Breadcrumbs = () => {
   const router = useRouter();

   // Inicialmente, la ruta base no tiene parámetros de query
   const baseRoute = router.asPath.split('?')[0];
   // Dividir la ruta base en segmentos
   const pathnames = baseRoute.split('/').filter((x) => x);

   let breadcrumbLinks = [];

   // Si la ruta es una de las rutas específicas, siempre mostrar "Inicio > Menu > [Nombre correspondiente]"
   const specificRoutes = ['/loyalty', '/nosotros', '/como-funciona', '/preguntas'];
   if (specificRoutes.includes(baseRoute)) {
      breadcrumbLinks.push({ href: '/menu', text: 'Menu' });
      breadcrumbLinks.push({ href: baseRoute, text: breadcrumbNameMap[baseRoute] });
   } else if (baseRoute.startsWith('/plato/')) {
      // Si la ruta comienza con '/plato/', mostrar "Inicio > Menu > Vianda"
      breadcrumbLinks.push({ href: '/menu', text: 'Menu' });
      breadcrumbLinks.push({ href: baseRoute, text: 'Vianda' });
   } else {
      // Construir los breadcrumbs para todas las demás rutas
      breadcrumbLinks = pathnames.map((path, index) => {
         const href = '/' + pathnames.slice(0, index + 1).join('/');
         const text = breadcrumbNameMap[href] || path;
         return { href, text };
      });
   }

   // No mostrar breadcrumbs si estamos en Inicio
   if (baseRoute === '/') return null;

   return (
      <>
         <nav aria-label='breadcrumbs' className={styles.breadcrumbs}>
            <ol className={styles.list}>
               <li className={styles.item}>
                  <Link href='/' prefetch={false}>
                     <a>Inicio</a>
                  </Link>
               </li>
               {breadcrumbLinks.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbLinks.length - 1;
                  return (
                     <li key={index} className={`${styles.item} ${isLast ? styles.itemCurrent : ''}`}>
                        {isLast ? (
                           <span>{breadcrumb.text}</span>
                        ) : (
                           <Link href={breadcrumb.href}>
                              <a>{breadcrumb.text}</a>
                           </Link>
                        )}
                     </li>
                  );
               })}
            </ol>
         </nav>
      </>
   );
};
