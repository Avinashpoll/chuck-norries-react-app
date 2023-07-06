import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function ChuckNorris() {
  const [category, setCategory] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      setData(response.data);
    } catch (error) {
      
    }
  };

  const fetchCategoryData = async () => {
    if (category) {
      try {
        const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
        setData(response.data);
      } catch (error) {
        
      }
    } else {
      fetchData();
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container">
      <h1 className='Animation'>Chuck Norries</h1>
      <div className="button-container">
        <button onClick={fetchData}>Random Joke</button>
      </div>
      <div className="button-container">
      
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="dev">Dev</option>
          <option value="animal">Animal</option>
          <option value="career">Career</option>
          <option value="celebrity">Celebrity</option>
          <option value="explicit">Explicit</option>
          <option value="fashion">Fashion</option>
          <option value="food">Food</option>
          <option value="history">History</option>

        </select>


        
        <button onClick={fetchCategoryData}>Get Unlimited Jokes</button>
      </div>
      <div className="result-container">
        {data && (
          <>
            <p>{data.value}</p>
            {data.categories && <p>Category: {data.categories[0]}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default ChuckNorris;
