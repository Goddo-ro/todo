import { API_URL } from "@/api"

export const login = async (username: string, password: string) => {
    const response = await fetch(API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    return response.json()
}

export const register = async (username: string, password: string) => {
    const response = await fetch(API_URL + '/users/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    return response.json()
}
