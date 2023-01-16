const { getGoogleAuthURL, getToken } = require("../utils/googleAuth");
const jwt_decode = require("jwt-decode");

const getGoogleAuthCode = async (req, res) => {
  try {
    const url = getGoogleAuthURL(process.env.REDIRECT_URI);
    res.redirect(url);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

const getUserCredentials = async (req, res) => {
  try {
    if (req.query.code) {
      const userData = await getToken(req.query.code, process.env.REDIRECT_URI);
      const payload = jwt_decode(userData.id_token);
        req.user = {
          // access_token: userData.access_token,
          email: payload.email,
          name: payload.name,
        };
        res.cookie("USER", req.user, {
          maxAge: 600000, //time in ms
          httpOnly: false,
          secure: false,
        });
      //   // console.log(req.user);
        // res.status(200).redirect("http://localhost:3000/home"); // change this redirect url in future
        res.status(200).redirect("https://authutkarsh.vercel.app/home"); // change this redirect url in future
    }
  } catch (error) {
    res.status(400).send(error);
  }
};


module.exports = {
  getUserCredentials,
  getGoogleAuthCode,
};
