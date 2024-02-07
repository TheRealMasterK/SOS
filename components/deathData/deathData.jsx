import React, { useState } from 'react';
import db from '../../firebase'; // Adjust this import path as needed
import firebase from 'firebase/app';
import 'firebase/firestore';
import './DeathData.css'

const DeathData = () => {
  const [name, setName] = useState('');
  const [vaccinated, setVaccinated] = useState(false);
  const [apparentReasonOfDeath, setApparentReasonOfDeath] = useState('');
  const [searchResult, setSearchResult] = useState(false);
  const [error, setError] = useState(false);
  
  const handleSearch = async () => {
    try {
      // Perform search on the website
      const result = await fetchDeathRecords(name); // Implement this function to fetch data from the website
      
      // Log the search result
      console.log('Search Result:', result);
      
      // Check if there's a response
      if (result) {
        setSearchResult(true);
      }
    } catch (err) {
      console.log(err)
      setError(true);
      setSearchResult(true)
      
    }
  };

  const handleSave = async () => {
    try {
      // Save data to user database
      const userRef = db.collection('users').doc(name);
      await userRef.set({
        name: name,
        vaccinated: vaccinated,
        apparentReasonOfDeath: apparentReasonOfDeath,
        searchResult: searchResult
      });
      
      console.log('Data saved successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchDeathRecords = async (name) => {
    try {
      // Implement code to fetch data from the website
      // Example:
      const response = await fetch(`https://www.publicrecordreports.com/search?q=${name}`);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('Failed to fetch data from the website.');
    }
  };

  return (
    <div className='outer-container'>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='response-data'>Hello World</div>
      
      {searchResult && (
        <div>
          <div>
          <label className='vaccinated'>
            Vaccinated:
            <input type="checkbox" checked={vaccinated} onChange={(e) => setVaccinated(e.target.checked)} />
          </label>
          </div>
          <div>
          <label className='reasonOfDeath'>
            Apparent Reason of Death:
            <input type="text" value={apparentReasonOfDeath} onChange={(e) => setApparentReasonOfDeath(e.target.value)} />
          </label>
          </div>
          <button onClick={handleSave}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default DeathData;
