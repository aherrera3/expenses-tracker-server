//creating an express server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2"); //accessing mysql

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sql3$Programm",
  database: "expensesdatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); //middleware

// req: request info from the front end
// res: sends response to the front end
app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO expenses (description, amount, category) VALUES ('for cat food', 120, 'groceries');";
  db.query(sqlInsert, (err, result) => {
    res.send(sqlInsert);
    console.log(result);
  });
});

app.listen(5174, () => {
  console.log("server running on port 5174");
}); //port
