const express = require("express");
const cors = require("cors");
const pet_routes = require("./routes/pet-routes");
const { db_connection_string } = require("./settings");
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

if (!db_connection_string) {
  console.error("Please specify a connection string to a database!");
  process.exit(1);
}

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello World!" }));
app.use("/pet", pet_routes);
app.listen(port, () => console.log(`Listening on port ${port}...`));
