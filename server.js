const express = require('express');
const app = express();
const port =  process.env.PORT || 5000 ;
var cors = require('cors');
const path = require('path');
require("dotenv").config({ path: "./config.env" });


app.use(cors());
app.use(express.json());


// const auth = 
const posts = require("./routes/postRoutes");
const comments = require("./routes/commentsRoutes");

const followings = require("./routes/followingsRoutes");
const followers = require("./routes/followerRoutes");
const profiles = require("./routes/profileRoutes");

const verifyAuthentication = require("./middlewares/auth");

// app.use(express.static(path.join(__dirname, './client/build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './client/build', 'index.html'));
// });

// const dbo = require("./db/conn");
const connectToDB = require("./db/conn");

connectToDB(process.env.ATLAS_URI);


app.use(express.static(path.join(__dirname, './client/build')));


app.use('/auth',require("./routes/authRoutes"))
app.use(verifyAuthentication);
app.use("/api/posts", posts);
app.use("/api/profile", profiles);
app.use("/api/comments", comments);
app.use("/api/followers", followers);
app.use("/api/followings", followings);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});


app.listen(port, () => {
  // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);

//   });
  console.log(`Server is running on port: ${port}`);
});

