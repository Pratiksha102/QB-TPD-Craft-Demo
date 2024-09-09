import React, { useEffect, useState } from "react";
import { getMedals } from "../api/quickbase";

const MedalsList = () => {
  const [medals, setMedals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedals = async () => {
      try {
        const data = await getMedals();
        console.log(data, "data in medals");
        setMedals(data); // Adjust if needed based on API response structure
      } catch (err) {
        setError("Failed to fetch medals");
      } finally {
        setLoading(false);
      }
    };

    fetchMedals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Medals List</h1>
      <ul>
        {medals.map((medal, index) => (
         <>
            <strong>Country:</strong> {medal.country} <br />
            <strong>Sport:</strong> {medal.sport} <br />
            <strong>Medal:</strong> {medal.medal} <br />
            <strong>Year:</strong> {medal.year} <br />
          </>
        ))}
      </ul>
    </div>
  );
};

export default MedalsList;
