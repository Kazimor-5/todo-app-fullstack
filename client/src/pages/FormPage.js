import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:5000/api/v1/todos';

const FormPage = () => {
  const [todo, setTodo] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todo) {
      await axios.post(url, { name: todo });
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h3 className='title'>ajouter une tâche</h3>

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
        ajouter la tâche
      </button>
    </form>
  );
};

export default FormPage;
