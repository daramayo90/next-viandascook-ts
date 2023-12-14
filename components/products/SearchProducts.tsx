import { ChangeEvent, FormEvent, FC, useCallback } from 'react';

import { BiSearchAlt } from 'react-icons/bi';

import styles from '../../styles/Products.module.css';

interface Props {
   searchTerm: string;
   setSearchTerm: (value: string) => void;
}

export const SearchProducts: FC<Props> = ({ searchTerm, setSearchTerm }) => {
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
   };

   const onSearchTerm = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         setSearchTerm(e.target.value);
      },
      [setSearchTerm],
   );

   return (
      <form className={styles.searchContainer} onSubmit={handleSubmit}>
         <BiSearchAlt className={styles.icon} />
         <input
            className={styles.search}
            type='text'
            name='query'
            placeholder='Buscar por nombre, ingrediente o tipo...'
            value={searchTerm}
            onChange={onSearchTerm}
         />
      </form>
   );
};
