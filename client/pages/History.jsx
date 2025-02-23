import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../pagestyling/History.css"
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
  async function handleDelete(id)
  {
    const response = await axios.delete(`http://localhost:5001/delete/${id}`);
    if(response.status === 200)
    {
      setHistory(history => history.filter(his => his._id!==id));
    }
  }
  return (
    <>
      
      {/* <ul>
        {history.map((his, index) => (
          <li key={index}>
            <h2>{new Date(his.createdAt).toLocaleString()}</h2>
            <span>{his.shortContent}</span>
            {
              his._id && 
              <a href={`http://localhost:5001/download-pdf/${his._id}`}>
                <button>View Pdf</button>
              </a>
            }
          </li> 
        ))}
      </ul> */}
    <div className='history-outer'>
      <center><h2 className='history-heading'><u>History</u></h2></center>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th ><center>Date & Time</center></th>
              <th className="short-content"><center>Short Content</center></th>
              <th><center>Actions</center></th>
            </tr>
          </thead>
          <tbody>
            {history.map((his, index) => (
              <tr key={index}>
                <td>{new Date(his.createdAt).toLocaleString()}</td>
                <td className="short-content">{his.shortContent}</td>
                <td>
                  {his._id && (
                    <>
                      <a href={`http://localhost:5001/download-pdf/${his._id}`}>
                      <button className="view-pdf">View PDF</button>
                    </a>
                    <button className='delete' onClick={()=>handleDelete(his._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default History;
