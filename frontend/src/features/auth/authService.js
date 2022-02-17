//service is strictly for making the actual http request and sending data back, setting data in local storage
//it's nice to have a service that does all the http request
import axios from 'axios';

const API_URL = '/api/users/';
//when we make our request, this is going to look into localhost:3000 where our frontend is running
//to send the request to server which runs on localhost:5000 we could manually set it up here
//or set up a proxy in the package.json file in the frontend

//Register user
//userData comes from authSlice file's createAsyncThunk function's second argument
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  //axios puts the data inside of an object called data
  //we're going to check for that and set our local storage with the data
  //we're going to set an item called user and set the string
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  //axios puts the data inside of an object called data
  //we're going to check for that and set our local storage with the data
  //we're going to set an item called user and set the string
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem('user');
};

//Any functions we're going to export, we're going to put in authService
//and export it as default
const authService = {
  register,
  logout,
  login,
};

export default authService;
