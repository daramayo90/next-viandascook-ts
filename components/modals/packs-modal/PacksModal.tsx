import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Modal from 'react-modal';
import { IoCloseSharp } from 'react-icons/io5';

import { IProduct } from '../../../interfaces';
import { customStyles } from './constants';

import styles from './styles/PacksModal.module.scss';

interface Props {
   pack: IProduct;
   isOpen: boolean;
   onClose: () => void;
}

export const PacksModal: FC<Props> = ({ pack, isOpen, onClose }) => {
   if (!pack.productsInPack || pack.productsInPack.length === 0) return null;

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={onClose}
         contentLabel='Viandas del pack'
         ariaHideApp={false}
         style={customStyles}>
         <div className={styles.packsModal}>
            <div className={styles.header}>
               <h3 className={styles.title}>{pack.name}</h3>
               <IoCloseSharp onClick={onClose} className={styles.closeIcon} />
            </div>

            <div className={styles.list}>
               {pack.productsInPack.map(({ product, quantity }) => (
                  <article key={product._id} className={styles.product}>
                     <Link href={`/plato/${product.slug}`}>
                        <div className={styles.image}>
                           <Image
                              src={product.image}
                              alt={product.name}
                              layout='fill'
                              objectFit='fill'
                           />
                        </div>
                     </Link>

                     <Link href={`/plato/${product.slug}`}>
                        <span className={styles.name}>
                           {product.name.length > 35
                              ? product.name.substring(0, 35) + '...'
                              : product.name}
                        </span>
                     </Link>

                     <span className={styles.quantity}>x{quantity}</span>
                  </article>
               ))}
            </div>
         </div>
      </Modal>
   );
};
