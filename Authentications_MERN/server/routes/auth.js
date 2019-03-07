const express = require('express');
const User = require('../DB/models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        id: user.id,
                        username: user.username
                        //type: user.type
                    }, config.jwtSecret,{expiresIn: '1m'});
                    res.json({ token });
                } else {
                    res.status(401).json({ errors: { form: 'Invalid Credentials' } });

                }
            } else {
                res.status(401).json({ errors: { form: 'Invalid Credentials' } });
            }
        });
});

module.exports = router;