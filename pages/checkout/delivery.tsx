import { useState } from 'react';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';

import DatePicker, { registerLocale } from 'react-datepicker';

import es from 'date-fns/locale/es';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';

import { holidays } from '../../utils';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/Delivery.module.css';

const DeliveryPage: NextPage = () => {
   const [startDate, setStartDate] = useState(new Date());

   registerLocale('es', es);

   const isWeekday = (date: Date) => {
      const day = date.getDay();

      return day !== 0 && day !== 6;
   };

   const handleDateChange = (date: Date): void => {
      setStartDate(date);
   };

   const handleDateSelect = (date: Date): void => {
      console.log('Date Selected', date);
   };

   return (
      <ShopLayout title={'Fecha de Entrega'} pageDescription={''}>
         <section className={styles.delivery}>
            <div className={styles.container}>
               <DatePicker
                  // inline
                  fixedHeight
                  locale='es'
                  dateFormat='dd/MM/yyyy'
                  placeholderText='Elegir fecha de entrega'
                  monthsShown={2}
                  shouldCloseOnSelect={true}
                  filterDate={isWeekday}
                  calendarStartDay={0}
                  includeDateIntervals={[
                     { start: subDays(new Date(), -2), end: addDays(new Date(), 90) },
                  ]}
                  excludeDates={holidays}
                  selected={startDate}
                  onSelect={handleDateSelect} //when day is clicked
                  onChange={handleDateChange} //only when value has changed
               >
                  {/* <div style={{ color: 'red' }}>
                     Horario de entrega: <u>20-23hs</u>
                  </div> */}
               </DatePicker>
            </div>
         </section>
      </ShopLayout>
   );
};

export default DeliveryPage;
