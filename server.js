const express = require("express");
const cors = require("cors");
const axios = require("axios");
// var session = require("express-session");
// const GitHubStrategy = require("passport-github2").Strategy;

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello");
});

app.get("/auth/github", async (req, res) => {
  const code = req.query.code;
  const params =
    "?client_id=" +
    process.env.CLIENT_ID +
    "&client_secret=" +
    process.env.CLIENT_SECRET +
    "&code=" +
    code;
  const url = "https://github.com/login/oauth/access_token" + params;

  const response = await axios.post(url, {
    headers: {
      accept: "application/json",
    },
  });
  res.json(response.data);
});

app.get("/auth/getuser", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.send({ message: "Not Authorized" });
  const url = "https://api.github.com/user";
  const response = await axios.get(url, {
    headers: {
      Authorization: token,
      accept: "application/json",
    },
  });
  res.send(response.data);
});

app.get("/auth/getRepos", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.send({ message: "Not Authorized" });
  const url = "https://api.github.com/user/repos";
  const response = await axios.get(url, {
    headers: {
      Authorization: token,
      accept: "application/json",
    },
  });
  res.send(response.data);
});

//get repo details
app.get("/auth/getRepoDetails", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.send({ message: "Not Authorized" });
  const url = req.query.repo;
  const response = await axios.get(url, {
    headers: {
      Authorization: token,
      accept: "application/json",
    },
  });
  res.send(response.data);
});

app.get("/auth/getRepoContributors", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.send({ message: "Not Authorized" });
  const url = req.query.repo;
  const response = await axios.get(url, {
    headers: {
      Authorization: token,
      accept: "application/json",
    },
  });
  res.send(response.data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port 7999");
});
