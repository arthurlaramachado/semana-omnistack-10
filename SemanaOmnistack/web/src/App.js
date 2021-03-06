import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem/Index';
import DevForm from './components/DevForm/Index';

function App() {
  const [devs, setDevs] = useState([]);

  async function loadDevs() {
    const response = await api.get('/devs');

    setDevs(response.data);
  }

  useEffect(() => {
    loadDevs();
  }, [devs]);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleDeleteDev(id) {
    await api.delete(`/deleteDev/${id}`);

    loadDevs();
  }

  return (
    <div id="app">
      <aside> 
        <strong> Cadastrar </strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main> 
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} handleDeleteDev={handleDeleteDev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
