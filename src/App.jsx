import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/authSlice'; // adjust path if needed

import Home from './site/page/Home';
import Login from './site/page/Login';
import Store from './site/page/Store';
import SingleBook from './site/page/SingleBook';
import Helper from './site/page/Helper';
import Footer from './site/component/Footer';
import Navbar from './site/component/Navbar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (accessToken && user) {
      dispatch(loginSuccess({ accessToken, user }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/helper' element={<Helper/>} />
            <Route path='/store' element={<Store/>} />
            <Route path='/store/:id' element={<SingleBook/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;