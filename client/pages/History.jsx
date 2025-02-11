import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const History = () => {
  const user = useSelector((state) => state.userInfo.user);
  const usertoken = user?.token;

  const [history, setHistory] = useState([]);
 
  useEffect(() => {
      axios.get(`http://localhost:5001/history/`,
      {headers:{
                'Authorization':`Bearer ${usertoken}` }})
        .then(response => setHistory(response.data))
        .catch(error => console.error('Error fetching data:', error));
  }, [usertoken]); 

  return (
    <>
      <h2>History</h2>
      <ul>
        {history.map((his, index) => (
          <li key={index}>{his.shortContent}</li> 
        ))}
      </ul>
    </>
  );
};

export default History;
