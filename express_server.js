const express = require("express");
const bodyParser = require("body-parser");
const cookiePaser = require("cookie-parser");
const app = express();
const PORT = 8080; // default port 8080

app.use(cookiePaser());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
console.log(generateRandomString());


///////////////////


///////////////////

// Routes
// => homepage
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

// urls
 app.get("/urls", (req, res) => {
  const templateVars = { username: res.cookie["username"], urls: urlDatabase };
  res.render("urls_index", templateVars);
});

// urls/new => page to create a shortURL
app.get("/urls/new", (req, res) => {
  const templateVars = {username: req.cookies["username"]};
  res.render("urls_new", templateVars);
});

// urls/:shortURL => page go to specific shortURL
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { username: req.cookies["username"] ,shortURL: req.params.shortURL, longURL:urlDatabase[req.params.shortURL]};
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {
  ////////////first exercise ///////////////
  //console.log("body",req.body);  // Log the POST request body to the console
  //res.send("Ok");         // Respond with 'Ok' (we will replace this)
  //////////////////////////////////////////
  let shortURL = generateRandomString();
  let longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  console.log(urlDatabase);
  res.redirect(`/urls/${shortURL}`);
});

// add a route to handle POST request to update a resource
app.post("/urls/:id", (req, res) => {
  const shortURL = req.params.id;
  const newlongURL = req.body.newlongURL;
  urlDatabase[shortURL] = newlongURL;
  res.redirect('/urls');
})

// add a route for adding username and login 
app.post("/login", (req, res) => {
res.cookie("username", req.body.username);
res.redirect("/urls");
})

// add a route for adding logout
app.post("/logout", (req,res) => {
  res.clearCookie("username", req.cookies["username"])
  res.redirect("/urls")
})

// after urls_index add "delete" button
app.post("/urls/:shortURL/delete", (req, res) => {
  console.log([req.params]);
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
})

// server is listening
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});



// app.get("/set", (req, res) => {
//   const a = 1;
//   res.send(`a = ${a}`);
//  });
 
//  app.get("/fetch", (req, res) => {
//   res.send(`a = ${a}`);
//  });