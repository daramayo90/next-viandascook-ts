import { FC, useContext, useState } from 'react';
import Modal from 'react-modal';
import Cookies from 'js-cookie';

import { APIProvider, AdvancedMarker, Map, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { IoCloseSharp } from 'react-icons/io5';

import { AutoCompleteInput, MapSelection } from './';

import { GOOGLE_MAPS } from '../../../analytics/google-maps';
import { customStyles, DEFAULT_CENTER, MAP_ID } from './constants';

import { SubmitButton } from '../../ui';
import { AuthContext, CartContext } from '../../../context';
import { ShippingAddress } from '../../../interfaces';

import styles from './AddressModal.module.scss';

interface Props {
   isOpen: boolean;
   onClose: () => void;
   reset?: (data?: ShippingAddress) => void;
}

export const AddressModal: FC<Props> = ({ isOpen, onClose, reset }) => {
   const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
   const [markerRef, marker] = useAdvancedMarkerRef();

   const { calculateShipping } = useContext(CartContext);
   const { isAuthLoaded, isLoggedIn, user, updateAddress } = useContext(AuthContext);

   const handleSubmit = async () => {
      if (!selectedPlace || !isAuthLoaded) return;

      const address = selectedPlace.name!;
      const city2 = selectedPlace.vicinity!;
      const city = selectedPlace.address_components!.find(
         (component) => component.types[0] === 'locality',
      )!.short_name;
      const zipcode = selectedPlace.address_components!.find(
         (component) => component.types[0] === 'postal_code',
      )!.short_name;

      let data: ShippingAddress = {
         firstName: '',
         lastName: '',
         address,
         address2: '',
         city: 'CABA',
         city2,
         zipcode,
         phone: '',
         email: '',
         dni: '',
      };

      if (isLoggedIn && user) {
         const { name, lastName, phone, email, dni } = user!;

         data = {
            firstName: name,
            lastName,
            address,
            address2: '',
            city: city === 'CABA' ? 'CABA' : 'Buenos Aires',
            city2,
            zipcode,
            phone: phone!,
            email,
            dni: dni!,
         };

         await updateAddress(data);
      }

      Cookies.set('address', address);
      Cookies.set('city', city);
      Cookies.set('zipcode', zipcode);
      Cookies.set('city2', city2);
      Cookies.set('fullAddress', selectedPlace.formatted_address!);

      calculateShipping(city);
      if (reset) reset(data);
      onClose();
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
