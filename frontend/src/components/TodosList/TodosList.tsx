import { $todos, fetchTodosFx } from "@/store/todo";
import Todo from "../Todo/Todo";
import styles from './TodoList.module.css';
import { useEffect } from "react";
import { $date } from "@/store/date";
import { useUnit } from "effector-react";
import { $user } from "@/store/auth";


const TodosList = () => {
    const [todos, date, user, fetchTodosEffect] = useUnit([$todos, $date, $user, fetchTodosFx]);

    useEffect(() => {
        if (!user?.token) return;
        fetchTodosEffect({date: new Date(Date.parse(date.toString())), token: user?.token})
    }, [date]);

    return (
        <ul className={styles['todo-list']}>
            {
                todos.map(todo => <Todo key={todo.id} todo={todo} />)
            }
        </ul>
    );
}

export default TodosList;
