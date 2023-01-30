const fs = require("fs");
const http = require("http");

const userDatas = [
  {
    name: "kyawkyaw",
    email: "kyawkyaw@gmail.com",
    pwd: "000000",
  },
  {
    name: "zawzaw",
    email: "zawzaw@gmail.com",
    pwd: "111111",
  },
];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/users") {
    const method = req.method;
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(userDatas));
      res.end();
    } else if (method === "POST") {
      let postData = "";
      req.on("data", (chunk) => {
        postData += chunk;
      });
      req.on("end", () => {
        const newUser = JSON.parse(postData);
        userDatas.push(newUser);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(userDatas));
        res.end();
      });
    } else if (method === "PUT") {
      let putData = "";
      req.on("data", (chunk) => {
        putData += chunk;
      });
      req.on("end", () => {
        const putUser = JSON.parse(putData);
        const newName = putUser.name;
        const checkEmail = userDatas.find((data) => {
          return putUser.email === data.email;
        });
        checkEmail ? (checkEmail.name = newName) : console.log("error");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(userDatas));
        res.end();
      });
    } else if (method === "DELETE") {
      let delData = "";
      req.on("data", (chunk) => {
        delData += chunk;
      });
      req.on("end", () => {
        const delUser = JSON.parse(delData);
        const checkIndex = userDatas.findIndex((data) => {
          return delUser.email === data.email;
        });
        userDatas.splice(checkIndex, 1);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(userDatas));
        res.end();
      });
    }
  } else {
    res.writeHead(500);
    res.write("<h1>Unknown Resource</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("server started");
});
