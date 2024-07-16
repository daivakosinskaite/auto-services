import React, { useState, useEffect, useContext } from 'react';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [masters, setMasters] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); 
            try {
                const servicesRes = await axios.get(`/api/services/user/${user.id}`, {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setServices(servicesRes.data);

                const mastersRes = await axios.get(`/api/masters/user/${user.id}`, {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setMasters(mastersRes.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <div>
            <h2>{user.name}'s Profile</h2>
            <h3>Your Services</h3>
            <ul>
                {services.map(service => (
                    <li key={service._id}>{service.name}</li>
                ))}
            </ul>
            <h3>Your Masters</h3>
            <ul>
                {masters.map(master => (
                    <li key={master._id}>{master.firstName} {master.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
