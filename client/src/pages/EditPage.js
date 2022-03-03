import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPage = () => {
  const [todo, setTodo] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const url = `http://localhost:5000/api/v1/todos/${id}`;

  const getTodo = useCallback(async () => {
    const { data } = await axios.get(url);
    setTodo(data.todo.name);
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.patch(url, { name: todo });
    navigate('/');
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h3 className='title'>modifier une tâche</h3>

      <div className='form-row'>
        <label htmlFor='' className='label-form'>
          Tâche
        </label>
        <input
          type='text'
          className='form-input'
          name='name'
          value={todo}
          onChange={handleChange}
        />
      </div>

      <button className='btn btn-block' type='submit'>
        modifier la tâche
      </button>
    </form>
  );
};

export default EditPage;
