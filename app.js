const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ayoubtrdone@gmail.com",
    pass: "ayoubtrd0."
  }
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/newmail", (req, res) => {
  const data = req.body;
  const html = `
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif
      }
      .box {
        width: 350px;
        margin: 10px auto;
        border: 3px solid #2980b9;
        padding-top: 30px;
      }
      h1 {
        color: #2980b9;
        padding-bottom: 30px;
        border-bottom: 1px solid #2980b9;
        text-align: center;
        text-transform: capitalize;
      }
      .phone {
        font-size: 30px;
        font-weight: 300;
        margin: 20px 0;
        text-align: center;
        color: black;
      }
      .content {
        margin-top: 20px;
        width: 100%;
        color: white;
        padding: 10px;
        background-color: #2980b9;
        position: relative;
      }
      .content p {
        margin-bottom: 10px;
        text-transform: capitalize;
      }
      .content span {
        text-transform: uppercase;
        font-weight: bold;
        display: block;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
  
    <div class="box">
  <h1>${data.name}</h1>
  <p class="phone">${data.phone}</p>
  <div class="content">
      <p class="city">
        <span>city:</span>${data.city}
      </p>
      <p class="address">
        <span>address:</span>
        ${data.address}</p>

  </div>
</div>
  </body>
</html>

  `;
  const mailOptions = {
    from: "ayoubtrdone@gmail.com",
    to: "jaznoreq@hotmail.com",
    subject: "a new purchase made",
    html: html
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err, info.response);
      res.render("error");
    } else {
      console.log(info.response);
      console.log("a new purchase has been made");
      res.render("sentmail");
    }
  });
});
app.listen(5000, () => console.log("Server started..."));
