import './styles/App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import { useStateValue } from './useReducer/StateProvider';
import { AuthProvider } from './useReducer/AuthContext';
import { useAuth } from './useReducer/AuthContext';


function App() {

  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();


  // useEffect(() => {
  //   axios.get('/messages/sync')
  //     .then(res => {
  //       setMessages(res.data)
  //     })
  // }, [])
  
  // useEffect(() => { 

  //   const pusher = new Pusher('eef5420130b643b793aa', {
  //     cluster: 'eu'
  //   });

  //   const channel = pusher.subscribe('messages');
  //   channel.bind('inserted', function(data) {
  //     setMessages([...messages, data])
  //   });

  //   return () =>{
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };

  // }, [messages])

  
  return (
      <div className="app">
      <Router>
        {true ? 
          (<Login/>) :
              (<div className="app__body">
              <Router>
                <Sidebar/>
                <Switch>
                  <Route path="/rooms/:roomId">
                    <Chat/>
                  </Route>
                  <Route path='/'>
                    <Chat/>      
                  </Route>
                </Switch>
              </Router>
            </div>)
        }
      </Router>
      </div>
  );
}

export default App;
