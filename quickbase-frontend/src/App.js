import './App.css';
import React, { useState, useCallback } from 'react';
import AddMedalForm from './components/AddMedalForm';
import MedalsList from './components/MedalsList';

function App() {
  const [medals, setMedals] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleAddMedal = useCallback(() => {
    setDataUpdated(true);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2 className='headinggg'>QuickBase Olympic Medal Tracker</h2>
      </header>
      <div style={{display:'flex'}}>
        <AddMedalForm onAddMedal={handleAddMedal} />
        <MedalsList dataUpdated={dataUpdated} setDataUpdated={setDataUpdated} />
      </div>
    </div>
  );
}

export default App;
