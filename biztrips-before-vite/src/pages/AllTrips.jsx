import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../services/tripService';

export default function AllTrips() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        getAllTrips()
            .then(res => setTrips(res.data))
            .catch(err => console.error("Error:", err));
    }, []);

    return (
        <div>
            <h2 className="text-white">All Business Trips</h2>
            <table className="table table-dark table-hover mt-4">
                <thead className="table-danger">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Start</th>
                    <th>End</th>
                </tr>
                </thead>
                <tbody>
                {trips.map(trip => (
                    <tr key={trip.id}>
                        <td>{trip.title}</td>
                        <td>{trip.description}</td>
                        <td>{trip.startTrip}</td>
                        <td>{trip.endTrip}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
