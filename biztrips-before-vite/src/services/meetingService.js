import axios from 'axios';

const API_URL = 'http://localhost:8080/api/meetings';

export const getAllMeetings = () => axios.get(API_URL);
export const getMeetingById = (id) => axios.get(`${API_URL}/${id}`);
export const createMeeting = (meeting) => axios.post(API_URL, meeting);
export const updateMeeting = (id, meeting) => axios.put(`${API_URL}/${id}`, meeting);
export const deleteMeeting = (id) => axios.delete(`${API_URL}/${id}`);
