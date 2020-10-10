const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pet_routes = require("./routes/pet-routes");
const {
    db_connection_string
} = require("./settings");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3000;

if (!db_connection_string) {
    console.error("Please specify a connection string to a database!");
    process.exit(1);
}

app.get("/", (req, res) => res.sendFile(__dirname + "/login.html"));
app.use("/pet", pet_routes);

app.get("/register", (req, res) => res.sendFile(__dirname + "/register.html"));
app.post("/register", function (req, res) {
    const roletitle = req.body.roletitle.value;
    const firstname = req.body.email;
    const lastname = req.body.password;
    const email = req.body.email;
    const password = req.body.password;
    res.write("Hi " + firstname + " " + lastname);
    res.write("\n");
    res.write("Your role is a: " + roletitle);
    res.write("\n");
    res.write("Your email is: " + email);
    res.write("\n");
    res.write("Your password is: " + password);
    res.write("\n");
    res.send();
});

app.get("/login", (req, res) => res.redirect("/"));
app.post("/login", function (req, res) {
    console.log(req.body);
    const roletitle = req.body.roletitle;
    const email = req.body.email;
    const password = req.body.password;
    res.write("Your role is a: " + roletitle);
    res.write("\n");
    res.write("Your email is: " + email);
    res.write("\n");
    res.write("Your password is: " + password);
    res.write("\n");
    res.send();
});

app.listen(port, () => console.log(`Listening on port ${port}...`));