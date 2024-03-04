import { fetchTodos, toggleTodo } from "@/services/todo";
import { createEffect, createStore, sample } from "effector"

export type Todo = {
    id: number,
    text: string,
    is_completed: boolean,
    time: string,
}

export const $todos = createStore<Todo[]>([]);

export const fetchTodosFx = createEffect(async (payload: {date: Date, token: string}) => {
    return await fetchTodos(payload.date, payload.token) as Todo[];
});

sample({
    clock: fetchTodosFx.doneData,
    target: $todos,
})
