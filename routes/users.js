const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require("../models/user.js");
//login handle
router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/adminregister', (req, res) => {
    res.render('adminregister');
})
//Register handle
router.post('/register', (req, res) => {
    const {
        name,
        email,
        county,
        level,
        role,
        password,
        password2
    } = req.body;
    let errors = [];
    console.log(' Name ' + name + ' email :' + email + ' pass:' + password + ' Role: ' + role);
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: "Please fill in all fields"
        })
    }
    //check if match
    if (password !== password2) {
        errors.push({
            msg: "Passwords do not match"
        });
    }

    //check if password is more than 6 characters
    if (password.length < 6) {
        errors.push({
            msg: 'Password should contain atleast 6 characters'
        })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            county: county,
            level: level,
            role: role,
            password: password,
            password2: password2,
        })
    } else {
        //validation passed
        User.findOne({
            email: email
        }).exec((err, user) => {
            console.log(user);
            if (user) {
                errors.push({
                    msg: 'The email you entered is already registered'
                });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })

            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    county: county,
                    level: level,
                    role: role,
                    password: password
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then((value) => {
                                    console.log(value);
                                    req.flash('success_msg', 'You have now registered! Enjoy Learning')
                                    res.redirect('/users/login');
                                })
                                .catch(value => console.log(value));

                        }));
            } //ELSE statement ends here

        })
    }
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
})

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Now logged out');
    res.redirect('/users/login');
})
module.exports = router;