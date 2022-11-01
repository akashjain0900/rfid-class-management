const express = require("express");
const app = express(); //Createing Express App
const path = require("path");

app.listen(3000, () => console.log("Server Started at port 3000")); //Starting and listening Server at port 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AkashRouter1 = require("./src/routes/route"); //Using Route.JS
app.use("/", AkashRouter1);

//Root Route
app.get("/index", (req, res) => {
  res.send("HI, WELCOME TO MY APP");
});
