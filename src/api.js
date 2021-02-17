import axios from 'axios';

// from the "Verify the Meet App" file
export const checkToken = async (accessToken) => {
    const result = await fetch (
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
        )
        .then((res) => res.json())
        .catch((error) => error.json());

    return result.error ? false : true;
    };

const getAccessToken = async () => {
    const accessToken = await localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || !tokenCheck) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        if(!code) {
        const results = await axios.get("https://xixfiq7och.execute-api.ca-central-1.amazonaws.com/dev/api/get-auth-url");
        const { authURL } = results.data;
        return(window.location.href = authURL);
        }
        return code && getToken(code);
    }
    return accessToken;
    ;}

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

const getToken = async (code) => {
    removeQuery();
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch(`https://xixfiq7och.execute-api.ca-central-1.amazonaws.com/dev/api/token/${encodeCode}`)
        .then((res) => {
            return res.json();
        })
        .catch((error) => error);
        access_token && localStorage.setItem("access_token", access_token);

        return access_token;
};