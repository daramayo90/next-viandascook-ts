import { useState, useContext } from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';

import es from 'date-fns/locale/es';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';

import { UIContext } from '../../context';
import { holidays } from '../../utils';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/Checkout.module.css';

export const SelectDate = () => {
   const { selectDeliveryDate } = useContext(UIContext);

   const [deliveryDate, setDeliveryDate] = useState<Date>();

   registerLocale('es', es);

   const isWeekday = (date: Date): boolean => {
      const day = date.getDay();

      return day !== 0 && day !== 6;
   };

   const isWeekend = (date: Date): string => {
      const day = date.getDay();

      if (day === 5) return 'friday';
      if (day === 6) return 'saturday';

      return '';
   };

   const setInterval = (date: Date, amount: number): Date => {
      if (isWeekend(date) === 'friday') amount = -4;

      if (isWeekend(date) === 'saturday') amount = -3;

      return subDays(date, amount);
   };

   const handleDateChange = (date: Date): void => {
      setDeliveryDate(date);
   };

   const handleDateSelect = (date: Date): void => {
      const selectedDate = date.toLocaleDateString('es-AR');
      selectDeliveryDate(selectedDate);
   };

   return (
      <div className={styles.date}>
         <DatePicker
            // inline
            fixedHeight
            locale='es'
            dateFormat='dd/MM/yyyy'
            placeholderText='Elegir fecha de entrega'
            shouldCloseOnSelect={true}
            filterDate={isWeekday}
            calendarStartDay={0}
            includeDateIntervals={[
               { start: setInterval(new Date(), -2), end: addDays(new Date(), 80) },
            ]}
            excludeDates={holidays}
            selected={deliveryDate}
            onSelect={handleDateSelect} //when day is clicked
            onChange={handleDateChange} //only when value has changed
         >
            <span className='time'>
               Horario de entrega: <u>20-23hs</u>
            </span>
         </DatePicker>
      </div>
   );
};
