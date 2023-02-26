import { ChangeEvent, FormEvent, FC } from 'react';

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

   const onSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   return (
      <form className={styles.searchContainer} onSubmit={handleSubmit}>
         <BiSearchAlt className={styles.icon} />
         <input
            className={styles.search}
            type='text'
            name='query'
            placeholder='Buscar...'
            value={searchTerm}
            onChange={onSearchTerm}
         />
      </form>
   );
};
