import axios from 'axios'

export const BaseUrl='http://localhost:8000'

const instance=axios.create({
    baseURL:BaseUrl,
    // headers: {
    //     'Content-Type': 'multipart/form-data',  // This is necessary for handling image uploads
    //   },
    withCredentials:true
})

export const get=(url,params)=>instance.get(url,{params})
export const post=(url,data)=>instance.post(url,data)
export const patch=(url,data)=>instance.patch(url,data)
export const del=(url)=>instance.delete(url)


// Add a request interceptor
instance.interceptors.request.use(function (config)  {
    // Log the request config for debugging
    console.log('Request Config:', config);
    return config;
}, function (error) {
    // Do something with request error
    console.error('Request Error:', error);
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Log the response data for debugging
    console.log('Apis Response', response);
    return response;
}, function (error) {
    // Log the error message for debugging
    console.log('Api Error', error.message);
    return Promise.reject(error);
});
