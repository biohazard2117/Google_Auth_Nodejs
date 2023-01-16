const express = require("express");
const {getUserDetails, getUserCredentials, getGoogleAuthCode} = require("../controllers/authControllers")

const router = express.Router();

// router.get('/', getUserDetails);
router.get("/signup/google/url", getGoogleAuthCode); // route to get the code from google api
router.get("/signup/google", getUserCredentials); // route to exchange code to get user credentials


module.exports = router;