import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutInitiate } from '../redux/actions';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {


  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();

   console.log(currentUser)

  const handleAuth = () => {
    if(currentUser){
      dispatch(logoutInitiate());
    }
  }

  return (
    <div className="app">
        <div>Welcome {currentUser?.displayName} to our site
            <button onClick={handleAuth}>Logout</button>
                {/* <BrowserRouter>
                    <Sidebar/>
                    <Routes>
                        <Route path="/rooms/:roomId">
                            <Chat/>
                        </Route>
                        <Route path='/'>
                            <Chat/>      
                        </Route>
                    </Routes>
                </BrowserRouter> */}
        </div>
    </div>
  )
}

export default Home



// import './styles/App.css';
// import Sidebar from './components/Sidebar';
// import Chat from './components/Chat';
// import { useEffect, useState } from 'react';
// import Pusher from 'pusher-js';
// import axios from './axios';
// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Login from './components/Login';
// import { useStateValue } from './useReducer/StateProvider';
// import { AuthProvider } from './useReducer/AuthContext';
// import { useAuth } from './useReducer/AuthContext';


// function App() {

//   const [messages, setMessages] = useState([]);
//   const { currentUser } = useAuth();
  
//   return (
//       <div className="app">
//       <Router>
//         {true ? 
//           (<Login/>) :
//               (<div className="app__body">
//               <Router>
//                 <Sidebar/>
//                 <Switch>
//                   <Route path="/rooms/:roomId">
//                     <Chat/>
//                   </Route>
//                   <Route path='/'>
//                     <Chat/>      
//                   </Route>
//                 </Switch>
//               </Router>
//             </div>)
//         }
//       </Router>
//       </div>
//   );
// }

// export default App;