import { Outlet, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import Header from '@/components/Header/Header';
import { useUnit } from 'effector-react';
import { $user } from '@/store/auth';
import { useEffect } from 'react';

const Auth = () => {
    const navigate = useNavigate();
    const user = useUnit($user);

    useEffect(() => {
        if (user) navigate('/')
    }, [user]);

    return (
        <main className={styles['container']}>
            <Header/>
            <Outlet/>
        </main>
    )
}

export default Auth;