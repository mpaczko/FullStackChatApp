import React,{useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserRoute from './components/UserRoute';
import { useDispatch } from 'react-redux';
import {auth} from './firebase';
import { setUser } from './redux/actions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(setUser(authUser))
      }else{
        dispatch(setUser(null))
      }
    })
  }, [])
  

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<UserRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
