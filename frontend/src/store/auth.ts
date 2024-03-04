import { login, register } from "@/services/user";
import { createEffect, createEvent, createStore, sample } from "effector";
import persist from "effector-localstorage";

type User = {
    id: number,
    token: string,
    username: string,
}

type UserResponse = {
    data: User,
    message: string,
}

export const logout = createEvent();

export const $user = createStore<User | null>(null)
    .on(logout, () => null);

export const loginFx = createEffect(async (payload: {username: string, password: string}) => {
    return await login(payload.username, payload.password) as UserResponse;
});

export const registerFx = createEffect(async (payload: {username: string, password: string}) => {
    return await register(payload.username, payload.password) as UserResponse;
});

sample({
    clock: [loginFx.doneData, registerFx.doneData],
    fn: (data) => data.data,
    target: $user,
})

persist({
    store: $user,
    key: 'user',
});
