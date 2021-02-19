import NProgress from 'nprogress';
import {mockData} from './mock-data';
import axios from 'axios';

// .map used to create array with only locations
// removes all duplicates by creating another new array using the spread operator and spreading a Set
// Set will removes all duplicates from array:

export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};

// removes the code from URL once user is finished with it.
const removeQuery = async() => {
    if (window.history.pushState && window.location.pathname) {
        var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
        window.history.pushState('','', newurl);
    } else {
        newurl = window.location.protocol + '//' + window.locationn.host;
        window.history.pushState('', '', newurl);
    }
};

// get new token, if they never had one:
const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch (
        'https://xixfiq7och.execute-api.ca-central-1.amazonaws.com/dev/api/token/'+ encodeCode
        )
        .then((res) => {
            return res.json();
        })
        .catch((error) => error);
    
    access_token && localStorage.setItem('access_token', access_token);
    return access_token;
}

// checks if access token, and if the access token is found in local storage:
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const getAccessToken = async() => {
    // check to see if if user already has access token from past login
    const accessToken = localStorage.getItem('access_token');

    //& if no access token in local storage:
    const tokenCheck = accessToken && (await checkToken(accessToken));
    if(!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        // if no code, redirects to Google Auth screen, where they sign in a receive code
        if (!code) {
            const results = await axios.get('https://xixfiq7och.execute-api.ca-central-1.amazonaws.com/dev/api/get-auth-url');
            const { authURL } = results.data;
            return(window.location.href = authURL);
        }
        return code && getToken(code);
    }
    return accessToken;
}


export const getEvents = async() => {
    NProgress.start();
    
    if(window.location.href.startsWith('https://localhost')){
        NProgress.done();
        return mockData;
    }

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = 'https://xixfiq7och.execute-api.ca-central-1.amazonaws.com/dev/api/get-events/' + token;
        const result = await axios.get(url);
        if(result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem('lastEvents', JSON.stringify(result.data));
            localStorage.setItem('locations', JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }
};