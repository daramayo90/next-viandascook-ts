import { FC, useState } from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import styles from '../../styles/AdminDatePicker.module.css';

interface Props {
   start?: Date;
   setStart: (value: Date) => void;
   end?: Date;
   setEnd: (value: Date) => void;
}

export const DateRangePicker: FC<Props> = ({ start, setStart, end, setEnd }) => {
   registerLocale('es', es);

   return (
      <div className={styles.datePicker}>
         <div className={styles.date}>
            <DatePicker
               fixedHeight
               locale='es'
               dateFormat='dd/MM/yyyy'
               placeholderText='Fecha desde'
               shouldCloseOnSelect={true}
               autoFocus={false}
               selected={start}
               calendarStartDay={0}
               onChange={(date) => setStart(date as Date)}
               selectsStart
               startDate={start}
               endDate={end}
            />
         </div>
         <div className={styles.date}>
            <DatePicker
               fixedHeight
               locale='es'
               dateFormat='dd/MM/yyyy'
               placeholderText='Fecha hasta'
               shouldCloseOnSelect={true}
               autoFocus={false}
               selected={end}
               calendarStartDay={0}
               onChange={(date) => setEnd(date as Date)}
               selectsEnd
               startDate={start}
               endDate={end}
               minDate={start}
            />
         </div>
      </div>
   );
};
