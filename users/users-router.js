const router = require("express").Router();

const Users = require("./users-model");

function restricted(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        res.status(401).json({error: "Restriced Access"});
    }
}

router.use(restricted);

router.get("/", (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(401).json({error: "You shall not pass!"})
    });
});

module.exports = router;