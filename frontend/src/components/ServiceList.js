
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="service-list-page">
      <h2>Service List</h2>
      <div className="service-cards">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>Address: {service.address}</p>
              <p>Manager: {service.manager}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;