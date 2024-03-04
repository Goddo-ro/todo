import Logo from '@/assets/images/logo.png';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles['header']}>
            <div className={styles['header__left']}>
                <img src={Logo} alt='logo' />
                <h1 className={styles['header__title']}>HabitHUB</h1>
            </div>
        </header>
    )
}

export default Header;