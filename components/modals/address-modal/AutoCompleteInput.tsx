import { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { POLYGON_COORDS } from './constants';
import Cookies from 'js-cookie';

import styles from './AddressModal.module.scss';

const getBoundaries = (): google.maps.Polygon | null => {
   if (typeof window === 'undefined' || !window.google) return null;

   return new window.google.maps.Polygon({
      paths: POLYGON_COORDS,
   });
};

interface Props {
   onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const AutoCompleteInput = ({ onPlaceSelect }: Props) => {
   const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
   const [error, setError] = useState('');

   const inputRef = useRef<HTMLInputElement>(null);
   const places = useMapsLibrary('places');

   // Autocomplete setup
   useEffect(() => {
      if (!places || !inputRef.current) return;

      const acOptions: google.maps.places.AutocompleteOptions = {
         componentRestrictions: { country: 'ar' },
      };

      setAutocomplete(new places.Autocomplete(inputRef.current, acOptions));
   }, [places]);

   // Address selection
   useEffect(() => {
      if (!autocomplete) return;

      autocomplete.addListener('place_changed', () => {
         const place = autocomplete.getPlace();
         if (!place?.geometry?.location) return;

         // Validate street number
         const streetNumber = place.address_components?.find(
            (component) => component.types[0] === 'street_number',
         );

         if (!streetNumber) {
            setError('Ingresa una altura de calle válida.');
            onPlaceSelect(null);
            Cookies.remove('address');
            Cookies.remove('city');
            return (inputRef.current!.value = '');
         }

         // Build the polygon
         const boundaries = getBoundaries();
         if (!boundaries || !window.google?.maps?.geometry) {
            return console.error('Geometry library not loaded or polygon not available');
         }

         // Check if location is inside the polygon
         const location = place.geometry.location;
         const isInside = window.google.maps.geometry.poly.containsLocation(location, boundaries);

         if (!isInside) {
            setError('Tu dirección está fuera de nuestra zona de entrega.');
            onPlaceSelect(null);
            Cookies.remove('address');
            Cookies.remove('city');
            return (inputRef.current!.value = '');
         }

         setError('');
         onPlaceSelect(place);
      });
   }, [autocomplete, onPlaceSelect]);

   return (
      <label className={styles.inputAddress}>
         <span>
            Dirección<strong>*</strong>
         </span>
         <input ref={inputRef} placeholder='Ingresa tu dirección...' />
         {error.length !== 0 && (
            <div className={styles.errorContainer}>
               <span className={styles.error}>{error}</span>
            </div>
         )}
      </label>
   );
};
