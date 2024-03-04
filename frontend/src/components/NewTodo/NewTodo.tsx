import { FormEvent, useState } from "react";
import { useUnit } from "effector-react";
import { addTodo } from "@/services/todo";
import { fetchTodosFx } from "@/store/todo";
import { $user } from "@/store/auth";
import styles from './NewTodo.module.css';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { $date } from "@/store/date";

const NewTodo = ({onClose}: {onClose: () => void}) => {
    const [value, setValue] = useState('');

    const [user, date, fetchTodos] = useUnit([$user, $date, fetchTodosFx]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!value || !user) return;

        addTodo(value, new Date(Date.parse(date.toString())), user?.token)
            .then(() => {
                onClose();
                fetchTodos({date: new Date(Date.parse(date.toString())), token: user?.token});
            });
    }

    return (
        <form onSubmit={handleSubmit} className={styles['form']}>
            <Input value={value} placeholder='Text' onChange={e => setValue(e.target.value)}/>
            <Button>Добавить</Button>
        </form>
    )
}

export default NewTodo;