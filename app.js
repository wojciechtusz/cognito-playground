const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const AWS = require("aws-sdk");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "XYZ",
    resave: true,
    saveUninitialized: true,
  })
);

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "us-east-1",
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Signup route
app.post("/signup", (req, res) => {
  const { password, email } = req.body;

  const params = {
    ClientId: "5ocobutrb60t3fcsp5ag6a7dl",
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  cognito.signUp(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to sign up" });
    }
    console.log(data);
    res.json({ message: "Signup successful" });
  });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: "5ocobutrb60t3fcsp5ag6a7dl",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  cognito.initiateAuth(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Login failed" });
    }
    console.log(data);
    res.json({ message: "Login successful" });
  });
});

// Serve signup.html for the signup route
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// Serve login.html for the login route
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
