import { useUnit } from 'effector-react';
import { $date } from '@/store/date';
import { $user } from '@/store/auth';
import { Todo as TodoType, fetchTodosFx } from '@/store/todo';
import styles from './Todo.module.css';
import { toggleTodo } from '@/services/todo';

type TodoProps = {
    todo: TodoType,
}

const Todo = ({todo}: TodoProps) => {
    const [date, user, fetchTodosEffect] = useUnit([$date, $user, fetchTodosFx]);

    const handleClick = () => {
        if (!user?.token) return;
        toggleTodo(todo.id, user.token)
            .then(() => fetchTodosEffect({date: new Date(Date.parse(date.toString())), token: user?.token}))
    }

    return (
        <li onClick={handleClick} className={[styles['todo'], todo.is_completed && styles['todo_complited']].join(' ')}>
            <p>{todo.text}</p>
        </li>
    );
}

export default Todo;