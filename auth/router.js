const bcryptjs = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model.js");
const {isValid} = require("../users/users-service");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if(isValid(credentials)) {
        const rounds = process.env.BCYRPT_ROUNDS || 8;
        //hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        
        credentials.password = hash;
        //save the user to the database
        Users.add(credentials).then(user => {
            req.session.loggedIn === true;
            res.status(201).json({data: user})
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
    } else {
        res.status(400).json({message: "please provide username and password and the password should be alphanumeric"});
    }
});

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if(isValid(req.body)) {
        Users.findBy({username: username})
        .then(([user]) => {
            // compare the password with the has stored in the database
            if (user && bcryptjs.compareSync(password, user.password)) {
                // we can save information about the client inside the session (req.session)
                req.session.loggedIn = true;
                req.session.user = user;

                res.status(200).json({message: "Logged In"});
            } else {
                res.status(401).json({message: "You shall not pass!"});
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
    } else {
        res.status(400).json({message: "please provide username and password"});
    }
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({message: "We could not log you out, try again later"})
            } else {
                res.status(204).end();
            }
        })
    } else {
        res.status(204).end();
    }
})
    
module.exports = router;