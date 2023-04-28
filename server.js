const express = require("express");

const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Op = db.Sequelize.Op;

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

db.sequelize.sync({force: true}).then(() => {
    initial();
});



  app.get("/", (req, res) => {
    res.json({ message: "Hello" });
})




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}); 

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

    User.create({
        username: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync("password123", 8),
    })
    .then(user => {
        user.setRoles([1,2]);
        }
    );
}
