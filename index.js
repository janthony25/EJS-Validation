import { render } from "ejs";
import express from "express";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let userIsAuthorised = false;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

function checkAccount(req, res, next) {
  const username = req.body["username"];
  const password = req.body["password"];
  if (username === "janthony25" && password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}

app.use(checkAccount);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/home", (req, res) => {
  const username = req.body["username"];
  if (userIsAuthorised) {
    res.render("index.ejs", {
      user: username,
    });
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
