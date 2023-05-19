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

// read info from the db
// sends all the table to the front end
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM expenses;";
  db.query(sqlSelect, (err, result) => {
    res.send(result); // sending all the db info
  });
});

// receives the new expense and insert it into the db table
app.post("/api/insert", (req, res) => {
  const description = req.body.description;
  const amount = req.body.amount;
  const category = req.body.category;
  const month = req.body.month;

  const sqlInsert =
    "INSERT INTO expenses (description, amount, category, month) VALUES (?,?,?,?);";
  // inserting info in our db
  db.query(sqlInsert, [description, amount, category, month], (err, result) => {
    if (err) console.log(err);
  });
});

//delete smtg from db
app.delete("/api/delete/:id", (req, res) => {
  const idExpense = req.params.id;
  const sqlDelete = "DELETE FROM expenses WHERE id = (?);";
  db.query(sqlDelete, [idExpense], (err, result) => {
    if (err) console.log(err);
  });
});

// //updating a expense in the expenses table
// app.put("/api/updateDB/:id", (req, res) => {
//   const idPrevious = req.params.id;
//   const idNew = req.body.id;
//   const description = req.body.description;
//   const amount = req.body.amount;
//   const category = req.body.category;

//   console.log(idPrevious, idNew);

//   const sqlUpdate =
//     "UPDATE expenses SET id = ?, description = ?, amount = ?, category = ? WHERE id = ?;";
//   db.query(
//     sqlUpdate,
//     [idNew, description, amount, category, idPrevious],
//     (err, result) => {
//       if (err) console.log(err);
//     }
//   );
// });

//updating a expense in the expenses table
// app.put("/api/update/:id", (req, res) => {
//   const idExpense = req.params.id;
//   const description = req.body.description;
//   const amount = req.body.amount;
//   const category = req.body.category;

//   const sqlUpdate =
//     "UPDATE expenses SET description = ?, amount = ?, category = ? WHERE id = ?;";
//   db.query(
//     sqlUpdate,
//     [description, amount, category, idExpense],
//     (err, result) => {
//       if (err) console.log(err);
//     }
//   );
// });

app.listen(5174, () => {
  console.log("server running on port 5174");
}); //port

// req: request info from the front end
// res: sends response to the front end
