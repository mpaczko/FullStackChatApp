import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync')
      .then(res => {
        setMessages(res.data)
      })
  }, [])
  

  useEffect(() => { 

    const pusher = new Pusher('eef5420130b643b793aa', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessages([...messages, data])
    });

    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages])

  
  return (
    <div className="app">
      <div className="app__body">
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
      </div>
    </div>
  );
}

export default App;
