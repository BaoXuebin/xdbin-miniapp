import { fetch, flatCondition } from './req';

const baseUrl = 'https://xdbin.com/api/v1/todo';

export const fetchTodayTodoList = condition => fetch(`${baseUrl}/today?${flatCondition(condition)}`);
export const finishTodoById = id => fetch(`${baseUrl}/${id}/finish`, 'post');
export const saveTodo = condition => fetch(`${baseUrl}?${flatCondition(condition)}`, 'post');