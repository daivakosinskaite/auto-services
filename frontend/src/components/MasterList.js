
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MasterList = () => {
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/masters');
        setMasters(response.data);
      } catch (error) {
        console.error('Error fetching masters:', error);
      }
    };

    fetchMasters();
  }, []);

  return (
    <div className="master-list-page">
      <h2>Master List</h2>
      <div className="master-cards">
        {masters.map((master) => (
          <div key={master._id} className="master-card">
            <img src={master.photo} alt={master.firstName + ' ' + master.lastName} className="master-photo" />
            <div className="master-info">
              <h3>{master.firstName} {master.lastName}</h3>
              <p>Specialization: {master.specialization}</p>
              <p>City: {master.city}</p>
              <p>Service: {master.service?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterList;