import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Servers } from './components/Servers'

let instance = null;

function App(props) {
  if (instance == null) instance = new Servers(props);
  const [current_server, setCurrentServer] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log('[DEBUG] Changed current server');
  }, [current_server]);  
  useEffect(() => {
    console.log('[DEBUG] Updated DOM');
  }, [update]);
  props.children.current_server = current_server;
  props.children.setCurrentServer = setCurrentServer;
  props.children.update = update;
  props.children.setUpdate = setUpdate;
  return (
    <div className='main'>
      {instance.render()}
    </div>
  )
}

export default App
