const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const port = process.env.PORT || 3000;
// console.log(__dirname);

//this middleware parses the body coming from html forms
//https://expressjs.com/en/api.html#express:~:text=express.urlencoded(%5Boptions%5D)
app.use(
  express.urlencoded({
    extended: true,
  })
);

//this middlware parses the body of the request comimg from axios/fetch apart from html forms
app.use(express.json());

//step 1 + 2
app
  .route("/")
  .get((req, res) => {
    res.status(200).send("Hello");
  })
  .put((req, res) => {
    res.status(200).sendFile("./views/first.html", { root: __dirname });
    //  res.sendFile(__dirname + "/views/first.html");
    //res.sendFile(path.join(__dirname, "/views/first.html"));
  });

//step 3
const myJSON = { good: "yep" };
app.delete("/", (req, res) => {
  res.status(200).json(myJSON);
});

//step 4
//https://expressjs.com/en/guide/using-template-engines.html
app.set("view engine", "ejs");

app.get("/test-ejs", (req, res) =>
  res.render("index", { myTitle: "my first title" })
);

//step 5
app.get("/test-ejs2", (req, res) =>
  res.render("users", { users: ["Bob", "John", "Jane"] })
);

//step 7
app.get("/showInput", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "first.html"));
});

//step 7
app.post("/showPost", (req, res) => {
  console.log("body", req.body);
  res.send(
    `First name is ${req.body.firstname} Last Name is ${req.body.lastname}`
  );
});

//step 9
app.get("/number/:id", (req, res) => {
  const { id } = req.params;
  res.send(`The number is ${id}`);
});

// let postDate = [];

// axios.get("http://jsonplaceholder.typicode.com/posts/1").then((resp) => {
//   console.log(resp.data);
//   postData = resp.data;
// });

// app.get("/postList", (req, res) => {
//   console.log(postData);
//   res.send(postData);
// });

//step 10 + 11
app.get("/postList", async (req, res) => {
  const { data } = await axios.get(
    "http://jsonplaceholder.typicode.com/posts/1"
  );
  // axios.get("http://jsonplaceholder.typicode.com/posts/1").then((resp) => {
  //  res.status(200).send(resp.data);
  // });
  res.status(200).send(data);
  fs.writeFile("./posts.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
