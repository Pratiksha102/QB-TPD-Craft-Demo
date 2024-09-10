import React, { useState } from 'react';
import { postMedal } from "../api/quickbase";
import './AddMedalForm.css'; // Import the CSS file

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
    <div className="container">
      <h2>Add New Medal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Country:</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} required>
            <option value="">Select Country</option>
            <option value="Canada">Canada</option>
            <option value="United States">United States</option>
            <option value="Germany">Germany</option>
            <option value="Norway">Norway</option>
          </select>
        </div>

        <div>
          <label>Sport:</label>
          <select value={sport} onChange={(e) => setSport(e.target.value)} required>
            <option value="">Select Sport</option>
            <option value="Wrestling">Wrestling</option>
            <option value="Rugby">Rugby</option>
            <option value="Tennis">Tennis</option>
            <option value="Karate">Karate</option>
          </select>
        </div>

        <div>
          <label>Medal:</label>
          <select value={medal} onChange={(e) => setMedal(e.target.value)} required>
            <option value="">Select Medal</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>

        <div>
          <label>Year:</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} required>
            <option value="">Select Year</option>
            <option value="2024">2024</option>
            <option value="2020">2020</option>
            <option value="2016">2016</option>
            <option value="2012">2012</option>
          </select>
        </div>

        <button type="submit">Add Medal</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default AddMedalForm;
