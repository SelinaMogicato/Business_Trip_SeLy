import axios from 'axios';

const API_URL = 'http://localhost:8080/api/trips';

export const getAllTrips = () => axios.get(API_URL);
export const getTripById = (id) => axios.get(`${API_URL}/${id}`);
export const createTrip = (trip) => axios.post(API_URL, trip);
export const updateTrip = (id, trip) => axios.put(`${API_URL}/${id}`, trip);
export const deleteTrip = (id) => axios.delete(`${API_URL}/${id}`);
