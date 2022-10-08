import './App.css';
import * as api from './Api'
import { useEffect, useState } from 'react';
function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.fetchTodo();
    setTodos(response.data.data);
  }

  const createTodo = async () => {
    try {
      const requestBody = { data: todo }
      const { data } = await api.createTodo(requestBody);
      setTodos([...todos, data.data]);
    } catch (error) {
      console.log('error', error);
    }
  }

  const editTodo = (id, title, description, date) => {
    setTodo({ id, title, description, date });
    setIsEdit(true);
  }

  const updateTodo = async () => {
    const requestBody = { data: todo }
    const result = await api.updateTodo(todo.id, requestBody);
    await fetchData();
  }

  const deleteTodo = async (id) => {
    const result = await api.deleteTodo(id);
    await fetchData();

  }

  return (
    <div className="container">


      <h1>Hai this is a todo app developed with React and Strapi....</h1>


      <form className="container w-50">
        <div className="mb-3 mt-5 w-50">
          <label className="form-label">Title:</label>
          <input type="text"
            required
            className="form-control rounded shadow-lg bg-body"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Date:</label>
          <input type="date"
            required
            className="form-control rounded shadow-lg bg-body"
            value={todo.date}
            onChange={(e) => setTodo({ ...todo, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea type="text"
            required
            className="form-control rounded shadow-lg bg-body"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </div>
        {!isEdit ? <button type="submit" className="btn btn-primary" onClick={createTodo}>Submit</button>
          : <button type="submit" className="btn btn-primary" onClick={updateTodo}>Update</button>}
        <button className="btn btn-secondary m-2" onClick={() => setTodo({ title: '', description: '', date: '' })}>Clear</button>
      </form>


      {todos.map((todo, idx) => (
        <div className="list-group mt-5 w-60 m-auto rounded shadow-lg bg-body" key={idx}>
          <a
            href="#"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{todo.attributes.title}</h5>
              <small>{todo.attributes.date}</small>
            </div>
            <p className="mb-1">{todo.attributes.description}</p>
            <div className="d-flex flex-row-reverse">

              <small className="ps-2" onClick={() => editTodo(todo.id, todo.attributes.title, todo.attributes.description, todo.attributes.date)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
              </small>

              <small onClick={() => deleteTodo(todo.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg></small>

            </div>
          </a>

        </div>
      ))}


    </div>
  );
}

export default App;
