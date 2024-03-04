import Calendar, { CalendarProps } from "react-calendar";
import { $date, setDate } from "@/store/date";
import { useUnit } from "effector-react";
import styles from './CalendarContainer.module.css';


const CalendarContainer = () => {
    const [date, setDateEv] = useUnit([$date, setDate]);

    const handleDateChange: CalendarProps['onChange'] = (date) => {
        if (!date || date.constructor !== Date) return;
        setDateEv(date)
    }

    return (
        <Calendar 
            value={date} 
            onChange={handleDateChange} 
            className={styles['calendar']} 
        />
    )
}

export default CalendarContainer;