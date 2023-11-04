import React from 'react';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/Sitemap.module.css';
import Link from 'next/link';

const SiteMapPage: NextPage = () => {
   return (
      <ShopLayout title={''} pageDescription={''}>
         <div className={styles.sitemap}>
            <div className={styles.container}>
               <div className={styles.column}>
                  <h2 className={styles.title}>Viandas Cook</h2>
                  <ul className={styles.list}>
                     <li>
                        <Link href='/'>
                           <span>Inicio</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu'>
                           <span>Menú</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/nosotros'>
                           <span>Sobre nosotros</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/loyalty'>
                           <span>Programa de puntos</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/como-funciona'>
                           <span>¿Cómo funciona?</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/preguntas'>
                           <span>Preguntas frecuentes</span>
                        </Link>
                     </li>
                  </ul>
               </div>
               <div className={styles.column}>
                  <h2 className={styles.title}>Nuestras Viandas</h2>
                  <ul className={styles.list}>
                     <li>
                        <Link href='/menu'>
                           <span>Todas</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Pollo"'>
                           <span>Viandas con Pollo</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Carne"'>
                           <span>Viandas con Carne</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Pescado"'>
                           <span>Viandas con Pescado</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Tarta"'>
                           <span>Tartas</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Empanada"'>
                           <span>Empanadas</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Wrap"'>
                           <span>Wraps</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Vegetariano"'>
                           <span>Viandas Vegetarianas</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Vegano"'>
                           <span>Viandas Veganas</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Bajo+en+calorías"'>
                           <span>Viandas Bajas en calorías</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Bajo+en+carbo"'>
                           <span>Viandas Bajas en carbo</span>
                        </Link>
                     </li>
                     <li>
                        <Link href='/menu?type="Bajo+en+sodio"'>
                           <span>Viandas Bajas en sodio</span>
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </ShopLayout>
   );
};

export default SiteMapPage;
