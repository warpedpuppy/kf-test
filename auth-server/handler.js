// where you implement functions
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

// SCOPES allow you to set access levels, set to readonly for now because
// we're using another google calendar and not one we can change

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// credentials are values required to get access to your calendar. 
// process.env means the value is in the config.json file

const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://KSFlynn007.github.io/meet-app/"],
  javascript_origins: ["https://KSFlynn007.github.io", "http://localhost:3000"],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// first step in oAuth process is to generate a url to users can login with
// google ad be authorized to see your calendar, after login they get a code as
// url parameter

module.exports.getAuthURL = async () => {
  // scopes array passed to 'scope' ptions. Any scopes passed must be enabled in the 
  // oAuth consent screen settings in project on google console. Any passed scopes ar ethe ones
  // users will see when the consent screen is displayed to them
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};