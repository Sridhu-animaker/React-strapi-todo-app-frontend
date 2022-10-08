import axios from 'axios';
const url = 'http://localhost:1337/api/todos';
export const fetchTodo = () => axios.get(url);
export const createTodo = newTodo => axios.post(url, newTodo);
export const deleteTodo = id => axios.delete(`${url}/${id}`);
export const updateTodo = (id, updatedTodo) => axios.put(`${url}/${id}`, updatedTodo);