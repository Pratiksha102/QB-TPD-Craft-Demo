import React, { useState } from 'react';
import { postMedal } from "../api/quickbase";

const AddMedalForm = () => {
  const [country, setCountry] = useState('');
  const [sport, setSport] = useState('');
  const [medal, setMedal] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await postMedal({ country, sport, medal, year });
      setSuccess('Medal added successfully!');
      setCountry('');
      setSport('');
      setMedal('');
      setYear('');
      setError(null);
    } catch (err) {
      setError('Failed to add medal');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Add New Medal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sport:</label>
          <input
            type="text"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Medal:</label>
          <input
            type="text"
            value={medal}
            onChange={(e) => setMedal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Medal</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default AddMedalForm;
