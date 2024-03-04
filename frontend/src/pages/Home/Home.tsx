import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { $user } from "@/store/auth";
import Aside from "@/components/Aside/Aside";
import Todos from "@/components/Todos/Todos";
import styles from './Home.module.css';


const Home = () => {
    const navigate = useNavigate();
    const user = useUnit($user);

    useEffect(() => {
        if (!user) navigate('/auth/login');
    }, [user]);

    return (
        <main className={styles['main']}>
            <Aside/>
            <Todos/>
        </main>
    )
}

export default Home;