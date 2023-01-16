const axios = require("axios");

const getGoogleAuthURL = (redirect) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirect}`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const searchParams = new URLSearchParams(options);

  return `${rootUrl}?${searchParams.toString()}`;
};

const getToken = async (code, redirect) => {
  const rootUrl = "https://oauth2.googleapis.com/token";
  const options = {
    redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirect}`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
  };
  // const opts = { headers: { accept: 'application/json' } };
  return await axios
    .post(rootUrl, options)
    .then((_res) => _res.data)
    .catch((err) => console.log(err));
  // .then((token) => console.log(token));
};

module.exports = { getGoogleAuthURL, getToken };
