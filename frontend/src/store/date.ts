import { createEvent, createStore } from "effector";
import persist from 'effector-localstorage'

export const setDate = createEvent<Date>();

export const $date = createStore<Date>(new Date())
    .on(setDate, (_, newDate) => newDate);

persist({
    store: $date,
    key: "date",
});
