import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const url = 'http://localhost:5000/api/v1/todos/';

const MainPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    await axios.delete(`${url}${id}`);

    const newTodos = todos.filter((todo) => todo._id !== id);
    setTodos(newTodos);
  };

  const showAllTodos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    showAllTodos();
  }, []);

  if (loading) {
    return (
      <main className='container'>
        <section className='loader'>
          <div className='loading'></div>
        </section>
      </main>
    );
  }

  return (
    <main className='container'>
      <section className='todos'>
        <div className='title'>
          <h1 className='title'>Todos</h1>
          <div className='title-underline'></div>
        </div>
        {todos.length > 0 ? (
          todos.map((todo) => {
            const { name, _id: taskID } = todo;

            return (
              <article className='todo' key={taskID}>
                <h5 className='name-title'>{name}</h5>
                <div className='btn-container'>
                  <Link to={`/edit/${taskID}`} className='edit-btn'>
                    <FaRegEdit />
                  </Link>
                  <button
                    className='delete-btn'
                    onClick={() => handleDelete(taskID)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <h3 className='title'> il n'y a pas de tâches dans votre liste</h3>
        )}
      </section>
    </main>
  );
};

export default MainPage;
