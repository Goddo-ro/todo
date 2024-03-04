import CalendarContainer from "../CalendarContainer/CalendarContainer";
import Header from "../Header/Header";
import 'react-calendar/dist/Calendar.css';
import styles from './Aside.module.css';

const Aside = () => {
    return (
        <aside className={styles['aside']}>
            <Header/>
            <CalendarContainer />
        </aside>
    )
}

export default Aside;