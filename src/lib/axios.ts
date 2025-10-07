
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:'https://assingmnet-5-percel-booking-system.vercel.app/api/v1' ,
  

  // baseURL: 'http://localhost:5000/api/v1',
  withCredentials : true
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
  
    console.log("Axios", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
); 

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
   
    console.log("Axios", response);
    return response;
  },
  function onRejected(error) {
  
    return Promise.reject(error);
  }
);
