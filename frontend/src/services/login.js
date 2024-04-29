import axios from "axios";

const baseUrl = process.env.NODE_ENV == 'dev' ?
    'http://localhost:3001/api/users/login'
    : '/api/users/login';

const login = async (formData) => {
    const response = await axios.post(baseUrl, formData);
    return response.data;
};


export default login;