// ! COMPONENTS
import MainPage from './pages/MainPage';
import FormPage from './pages/FormPage';
import EditPage from './pages/EditPage';
import ErrorPage from './pages/ErrorPage';
// ! FILES
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <nav className='navbar'>
        <Link className='nav-link' to='/'>
          Accueil
        </Link>
        <Link className='nav-link' to='/create-todo'>
          Ajouter une tâche
        </Link>
      </nav>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path='/create-todo' element={<FormPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
