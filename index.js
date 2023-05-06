//creating an express server
const express = require("express");
const app = express();

// req: request info from the front end
// res: sends response to the front end
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5174, () => {
  console.log("server running on port 5174");
}); //port
