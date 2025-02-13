import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

interface Props {
   place: google.maps.places.PlaceResult | null;
   marker: google.maps.marker.AdvancedMarkerElement | null;
}

export const MapSelection = ({ place, marker }: Props) => {
   const map = useMap();

   useEffect(() => {
      if (!map || !place || !marker) return;

      if (place.geometry?.viewport) {
         map.fitBounds(place.geometry.viewport);
      } else if (place.geometry?.location) {
         map.setCenter(place.geometry.location);
      }

      marker.position = place.geometry?.location || null;
   }, [map, place, marker]);

   return null;
};
