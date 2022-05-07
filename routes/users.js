const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require("../models/user.js");
const nodemailer = require("nodemailer");
//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/otpauthenticate',(req,res)=>{
    res.render('otpauthenticate');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
router.get('/adminregister', (req,res)=>{
    res.render('adminregister');
})
//Register handle
router.post('/register',(req,res)=>{
    const {name,email, county,level,role,password, password2} = req.body;
let errors = [];
console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password+ ' Role: ' +role);
if(!name || !email || !password || !password2) {
    errors.push({msg : "Please fill in all fields"})
}
//check if match
if(password !== password2) {
    errors.push({msg : "passwords dont match"});
}

//check if password is more than 6 characters
if(password.length < 6 ) {
    errors.push({msg : 'password atleast 6 characters'})
}
if(errors.length > 0 ) {
res.render('register', {
    errors : errors,
    name : name,
    email : email,
    county : county,
    level : level,
    role : role,
    password : password,
    password2 : password2,
     })
} else {
    //validation passed
   User.findOne({email : email}).exec((err,user)=>{
    console.log(user);   
    if(user) {
        errors.push({msg: 'email already registered'});
        res.render('register',{errors,name,email,password,password2})
        
       } else {
        const newUser = new User({
            name : name,
            email : email,
            county : county,
            level : level,
            role : role,
            password : password
        });
           //hash password
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                    //save user


const {email,phonenumber} = req.body;
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'davidmuhia87@gmail.com', // generated ethereal user
          pass: 'sbhcdlxcyamtwdwp', // generated ethereal password
        },
        tls:{rejectUnauthorized: false},
      });

      // send mail with defined transport object
     transporter.sendMail({
        from: '"SchoolMate" <info@schoolmate.com>', // sender address
        to: email, // list of receivers
        subject: "SchoolMate", // Subject line
        text: "Click on the link below to activate your account http://localhost:3000/users/login", // plain text body
        html: '<b>Welcome to schoolmet and thankyou for choosing the schoolmet learning plateform.Enjoy learning</b>', // html body
      },(error,info)=>{
        if(error){
            return console.log(error);
        }
         console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });

     
     const credentials = {
    apiKey: 'c8586bca5914b3eb7f92a77faf38d13a653bfb8e3e2d8f33ec8ac09d3d3a2c42',         // use your sandbox app API key for development in the test environment
    username: 'firstnode',      // use 'sandbox' for development in the test environment
};
const Africastalking = require('africastalking')(credentials);

// Initialize a service e.g. SMS
const sms = Africastalking.SMS

// Use the service
const options = {
    to: [phonenumber],
    message: "Welcome to schoolmate your activation code is 4567"
}

// Send message and capture the response or error
sms.send(options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });




                    newUser.save()
                    .then((value)=>{
                        console.log(value);
                        req.flash('success_msg','Check your phone for the activation code!')
                    res.redirect('/users/otpauthenticate');
                    })
                    .catch(value=> console.log(value));
                      
                }));
             } //ELSE statement ends here

})
}
})
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
successRedirect : '/dashboard',
failureRedirect : '/users/login',
failureFlash : true,
})(req,res,next);
  })

//logout
router.get('/logout',(req,res)=>{
    req.logout();
req.flash('success_msg','Now logged out');
res.redirect('/users/login');
 });

router.post('/update',(req,res)=>{
    const {name,email, county,level} = req.body;
let errors = [];
console.log(' Name ' + name+ ' email :' + email+ ' county:' + county+ ' level: ' +level);
if(!name || !email || !county || !level) {
    errors.push({msg : "Please fill in all fields"})
}

if(errors.length > 0 ) {
res.render('register', {
    errors : errors,
    name : name,
    email : email,
    county : county,
    level : level,
     })
} else {
    //validation passed
    const {email} = req.body;
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'davidmuhia87@gmail.com', // generated ethereal user
          pass: 'sbhcdlxcyamtwdwp', // generated ethereal password
        },
        tls:{rejectUnauthorized: false},
      });

      // send mail with defined transport object
     transporter.sendMail({
        from: '"SchoolMate" <info@schoolmate.com>', // sender address
        to: email, // list of receivers
        subject: "SchoolMate", // Subject line
        text: "Click on the link below to activate your account http://localhost:3000/users/login", // plain text body
        html: '<b>Your account info has been updated</b>', // html body
      },(error,info)=>{
        if(error){
            return console.log(error);
        }
         console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });

        User.findOneAndUpdate({email: req.user.email},
        {name: req.body.name,level: req.body.level,email: req.body.email,county: req.body.county},
        function(err, numberAffected, rawResponse) {
       console.log('new profile update error');
       req.flash('success_msg','Check your phone for the activation code!')
    res.redirect('/profile');
                    })
                    .catch(value=> console.log(User));
}
console.log(req.user.name);
});


module.exports  = router;