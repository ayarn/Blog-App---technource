import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <div className='container' style={{ height: "100vh" }}>
        <Routes>
          {
            auth ?
              (
                <Route path='/' element={<Home />} />
              )
              :
              (
                <>
                  <Route path='/' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                </>
              )
          }
        </Routes>
      </div>
    </>
  );
}

export default App;
