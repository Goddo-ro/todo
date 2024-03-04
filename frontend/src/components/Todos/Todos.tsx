import { useState } from "react";
import { useUnit } from "effector-react"
import { $user, logout } from "@/store/auth";
import { $date } from "@/store/date"
import TodosList from "../TodosList/TodosList";
import Modal from "../UI/Modal/Modal";
import styles from './Todos.module.css';
import NewTodo from "../NewTodo/NewTodo";

const Todos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className={styles['section']}>
            <TodosHeader/>
            <TodosList/>
            {isModalOpen && 
            <Modal onClose={() => setIsModalOpen(false)}>
                <NewTodo onClose={() => setIsModalOpen(false)}/>
            </Modal>}
            <div className={styles['add-todo']} onClick={() => setIsModalOpen(true)}>+</div>
        </section>
    )
}

const TodosHeader = () => {
    const [date, user, logoutEvent] = useUnit([$date, $user, logout]);

    const getDate = () => {
        const curDateTime = new Date();
        const savedDate = new Date(Date.parse(date.toString()))
        if (curDateTime.getFullYear() === savedDate.getFullYear() 
                && curDateTime.getMonth() === savedDate.getMonth() 
                && curDateTime.getDay() === savedDate.getDay()) {
            return "Сегодня"
        }

        return savedDate.toLocaleDateString();
    }

    return (
        <div className={styles['header']}>
            <h2 className={styles['header__current-date']}>{getDate()}</h2>
            <div>
                <p>{user?.username} <span className={styles['header__exit']} onClick={() => logoutEvent()}>Выйти</span></p>
            </div>
        </div>
    )
}

export default Todos;