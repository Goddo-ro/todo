import { API_URL } from "@/api"

export const fetchTodos = async (date: Date, token: string) => {
    const response = await fetch(API_URL + '/todos?' + new URLSearchParams({
        date: date.toLocaleString().split(', ')[0],
    }), {
        headers: { 'Authorization': 'Bearer ' + token },
    });

    return await response.json();
}

export const toggleTodo = async (id: number, token: string) => {
    const response = await fetch(API_URL + `/todos/toggle/${id}`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
    });

    return await response.json();
}

export const addTodo = async (text: string, date: Date, token: string) => {
    const response = await fetch(API_URL + `/todos`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ text, date: date.toLocaleString().split(', ')[0] }),
    });

    return await response.json();
}