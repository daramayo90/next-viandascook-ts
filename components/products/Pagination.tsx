import { FC, useState } from 'react';

import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

import styles from './styles/Pagination.module.scss';

interface Props {
   totalPages: number;
   page: number;
   setPage: (value: number) => void;
}

const VISIBLE_PAGES = 4;

export const Pagination: FC<Props> = ({ totalPages, page, setPage }) => {
   const [firstVisiblePage, setFistVisiblePage] = useState(1);

   // Build the array of visible page numbers.
   const visiblePages: number[] = [];
   for (let p = firstVisiblePage; p < firstVisiblePage + VISIBLE_PAGES && p <= totalPages; p++) {
      visiblePages.push(p);
   }

   const handlePageClick = (p: number) => {
      setPage(p);
      // Slide the window forward if clicking the last visible page and it's not the last overall.
      if (p === firstVisiblePage + VISIBLE_PAGES - 1 && p < totalPages) {
         setFistVisiblePage(firstVisiblePage + 1);
      }
      // Slide the window backward if clicking the first visible page and it's not page 1.
      else if (p === firstVisiblePage && firstVisiblePage > 1) {
         setFistVisiblePage(firstVisiblePage - 1);
      }
   };

   return (
      <div className={styles.pagination}>
         {page > 1 && (
            <CiCircleChevLeft className={styles.back} onClick={() => handlePageClick(page - 1)} />
         )}

         {visiblePages.map((p) => (
            <button
               key={p}
               onClick={() => handlePageClick(p)}
               className={p === page ? `${styles.page} ${styles.activePage}` : styles.page}>
               {p}
            </button>
         ))}

         {page < totalPages && (
            <CiCircleChevRight className={styles.next} onClick={() => handlePageClick(page + 1)} />
         )}
      </div>
   );
};
