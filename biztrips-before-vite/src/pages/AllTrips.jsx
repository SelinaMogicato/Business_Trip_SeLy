import React, { useEffect, useState } from 'react';
import { getAllTrips } from '../services/tripService';

export default function AllTrips() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        getAllTrips()
            .then(res => setTrips(res.data))
            .catch(err => console.error("Error loading trips:", err));
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4 mb-3 text-danger">All Business Trips</h2>

            {trips.length === 0 ? (
                <p className="text-muted">No trips available.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped">
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
            )}
        </div>
    );
}
