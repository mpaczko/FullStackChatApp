import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar/>
        <Chat/>
      </div>
      {/* Chat componenet */}
    </div>
  );
}

export default App;
