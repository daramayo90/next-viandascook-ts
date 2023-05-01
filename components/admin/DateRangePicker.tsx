import { useState } from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import styles from '../../styles/AdminDatePicker.module.css';

export const DateRangePicker = () => {
   const [startDate, setStartDate] = useState<Date>();
   const [endDate, setEndDate] = useState<Date>();

   registerLocale('es', es);

   console.log('start', startDate);
   console.log('end', endDate);

   return (
      <div className={styles.date}>
         <DatePicker
            fixedHeight
            locale='es'
            dateFormat='dd/MM/yyyy'
            shouldCloseOnSelect={true}
            autoFocus={false}
            selected={startDate}
            calendarStartDay={0}
            onChange={(date) => setStartDate(date as Date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
         />
         <DatePicker
            fixedHeight
            locale='es'
            dateFormat='dd/MM/yyyy'
            shouldCloseOnSelect={true}
            autoFocus={false}
            selected={endDate}
            calendarStartDay={0}
            onChange={(date) => setEndDate(date as Date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
         />
      </div>
   );
};
