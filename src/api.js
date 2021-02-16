import axios from 'axios';

// from the "Verify the Meet App" file
const checkToken = async (accessToken) => {
    const result = await fetch (
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
        )
        .then((res) => res.json())
        .catch((error) => error.json());

    return result.error ? false : true;
    };

const getAccessToken = async () => {
    const accessToken = await
    localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || !tokenCheck) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        if(!code) {
        const results = await axios.get(
            'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=841717757727-88vckej4dd8ul7sd5u72c8fe47qb999i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2FKSFlynn007.github.io%2Fmeet-app%2F'
        );
        const { authURL } = results.data;
        return(window.location.href = authURL);
        }
        return code && getToken(code);
    }
    return accessToken;
    }

const getToken = async (code) => {
removeQuery();
}