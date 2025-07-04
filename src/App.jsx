import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/authSlice'; // adjust path if needed

import ScrollToTop from './site/component/ScrollToTop';

import Home from './site/page/Home';
import Login from './site/page/Login';
import Store from './site/page/Store';
import SingleBook from './site/page/SingleBook';
import Checkout from './site/page/Checkout';
import Helper from './site/page/Helper';
import Orders from './site/page/Orders';
import NotFound from './site/page/NotFound';
import ForgotPassword from './site/page/ForgotPassword';
import Signup from './site/page/Signup';
import ResetPassword from './site/page/ResetPassword';
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
      <ScrollToTop />
      <div className='flex flex-col min-h-screen relative font-dmserif'>
        <Navbar />
        <main className='flex-grow flex'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/helper' element={<Helper/>} />
            <Route path='/store' element={<Store/>} />
            <Route path='/store/:id' element={<SingleBook/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/order' element={<Orders/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;