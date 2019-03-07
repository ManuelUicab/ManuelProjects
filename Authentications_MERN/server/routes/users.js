const express = require('express');
const SignupValidation = require('../validation/Signup');
const User = require('../DB/models/users');
const bcrypt = require('bcrypt');
const isEmpty = require('is-empty');

const router = express.Router();

router.get('/:email', (req, res) => {
    User.findOne({ email: req.params.email })
        .then(user => {
            res.json({ user });
        });
});


router.post('/', async (req, res) => {

    let { errors, isValid } = await SignupValidation(req.body)

    if (!isValid) {
        res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'There is user with such email';
                isValid = isEmpty(errors);
            }
            if (!isValid) {
                res.status(400).json(errors);
            } else {
                let { password } = req.body;
                const { username, email } = req.body;
                password = bcrypt.hashSync(password, 10);
                const usersave = new User({ username, email, password });
                usersave.save()
                    .then(user => res.json({ success: true }))
                    .catch(err => res.status(500).json({ error: err }));
            }
        });
});

module.exports = router;