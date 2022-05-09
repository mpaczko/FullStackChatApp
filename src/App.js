import React,{useEffect, useContext, useLayoutEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import {auth} from './firebase';
import { setUser } from './redux/actions';
import Users from './components/Users';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import PrivRouteNavigate from './routes/Redirect';
import { Navigate} from 'react-router-dom';
// import AOS from 'aos';
import 'aos/dist/aos.css';



function App() {

  const dispatch = useDispatch();

 
    // AOS.init();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(setUser(authUser));
      }else{
        dispatch(setUser(null));
      }
    })
  }, [])


  return (

      <div className="app">
        <Routes>
          <Route path='/' element={<PrivRouteNavigate/>}>
            <Route path='/' element={<Navigate to='/users'/>}/>
            <Route path='users/' element={<Users/>}/>
            <Route path='users/:id' element={<Users><Chat/></Users>}/>
            <Route path='rooms' element={<Sidebar/>}/>
            <Route path='rooms/:id' element={<Sidebar><Chat/></Sidebar>}/>
          </Route>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='*' element={<PrivRouteNavigate/>}/>
        </Routes>
      </div>

  );
}

export default App;

