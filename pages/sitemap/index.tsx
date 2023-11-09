import React from 'react';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';

import styles from '../../styles/Sitemap.module.css';
import Link from 'next/link';

const SiteMapPage: NextPage = () => {
   return (
      <ShopLayout
         title={'Mapa del Sitio | Viandas Cook'}
         pageDescription={'Acá encontrarás las principales URLs del sitio'}>
         <div className={styles.sitemap}>
            <div className={styles.container}>
               <div className={styles.column}>
                  <h2 className={styles.title}>Viandas Cook</h2>
                  <ul className={styles.list}>
                     <Link href='/'>
                        <a className={styles.linkList}>
                           <span>Inicio</span>
                        </a>
                     </Link>
                     <Link href='/menu'>
                        <a className={styles.linkList}>
                           <span>Menú</span>
                        </a>
                     </Link>
                     <Link href='/nosotros'>
                        <a className={styles.linkList}>
                           <span>Sobre nosotros</span>
                        </a>
                     </Link>
                     <Link href='/loyalty'>
                        <a className={styles.linkList}>
                           <span>Programa de puntos</span>
                        </a>
                     </Link>
                     <Link href='/como-funciona'>
                        <a className={styles.linkList}>
                           <span>¿Cómo funciona?</span>
                        </a>
                     </Link>
                     <Link href='/preguntas'>
                        <a className={styles.linkList}>
                           <span>Preguntas frecuentes</span>
                        </a>
                     </Link>
                  </ul>
               </div>
               <div className={styles.column}>
                  <h2 className={styles.title}>Nuestras Viandas</h2>
                  <ul className={styles.list}>
                     <Link href='/menu'>
                        <a className={styles.linkList}>
                           <span>Todas</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Pollo"'>
                        <a className={styles.linkList}>
                           <span>Viandas con Pollo</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Carne"'>
                        <a className={styles.linkList}>
                           <span>Viandas con Carne</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Pescado"'>
                        <a className={styles.linkList}>
                           <span>Viandas con Pescado</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Tarta"'>
                        <a className={styles.linkList}>
                           <span>Tartas</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Empanada"'>
                        <a className={styles.linkList}>
                           <span>Empanadas</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Wrap"'>
                        <a className={styles.linkList}>
                           <span>Wraps</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Vegetariano"'>
                        <a className={styles.linkList}>
                           <span>Viandas Vegetarianas</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Vegano"'>
                        <a className={styles.linkList}>
                           <span>Viandas Veganas</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Bajo+en+calorías"'>
                        <a className={styles.linkList}>
                           <span>Viandas Bajas en calorías</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Bajo+en+carbo"'>
                        <a className={styles.linkList}>
                           <span>Viandas Bajas en carbo</span>
                        </a>
                     </Link>

                     <Link href='/menu?type="Bajo+en+sodio"'>
                        <a className={styles.linkList}>
                           <span>Viandas Bajas en sodio</span>
                        </a>
                     </Link>
                  </ul>
               </div>
            </div>
         </div>
      </ShopLayout>
   );
};

export default SiteMapPage;
