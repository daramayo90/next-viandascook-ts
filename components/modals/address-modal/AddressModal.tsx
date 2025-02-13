import { FC, useContext, useState } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';

import { APIProvider, AdvancedMarker, Map, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { IoCloseSharp } from 'react-icons/io5';

import { AutoCompleteInput, MapSelection } from './';

import { GOOGLE_MAPS } from '../../../analytics/google-maps';
import { customStyles, DEFAULT_CENTER, MAP_ID } from './constants';

import styles from './AddressModal.module.scss';
import { Button, SubmitButton } from '../../ui';
import { CartContext } from '../../../context';

interface Props {
   isOpen: boolean;
   onClose: () => void;
}

export const AddressModal: FC<Props> = ({ isOpen, onClose }) => {
   const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
   const [markerRef, marker] = useAdvancedMarkerRef();

   const { calculateShipping } = useContext(CartContext);

   const handleSubmit = () => {
      if (selectedPlace) {
         const address = selectedPlace.name!;
         const city = selectedPlace.address_components!.find(
            (component) => component.types[0] === 'locality',
         )!.short_name;

         Cookies.set('address', address);
         Cookies.set('city', city);

         calculateShipping(city);
         onClose();
      }
   };

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={onClose}
         contentLabel='Select your address'
         ariaHideApp={false}
         style={customStyles}>
         <div className={styles.header}>
            <h3 className={styles.title}>¿Dónde te encontrás?</h3>
            <IoCloseSharp onClick={onClose} className={styles.closeIcon} />
         </div>

         <APIProvider apiKey={GOOGLE_MAPS} libraries={['places', 'geometry']}>
            <AutoCompleteInput onPlaceSelect={setSelectedPlace} />

            <Map
               className={styles.map}
               mapId={MAP_ID}
               defaultZoom={12}
               defaultCenter={DEFAULT_CENTER}
               gestureHandling={'greedy'}
               disableDefaultUI={true}>
               <AdvancedMarker ref={markerRef} position={null} />
            </Map>

            <MapSelection place={selectedPlace} marker={marker} />
         </APIProvider>

         <div className={!selectedPlace ? styles.button : styles.buttonActive}>
            <SubmitButton content={'Continuar'} isClicked={!selectedPlace} onClick={handleSubmit} />
         </div>
      </Modal>
   );
};
