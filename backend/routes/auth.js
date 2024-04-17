const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchuser = require("../middlewares/fetchuser");

const JWT_SECRET = "samrudhi$@mon";

const router = express.Router();




//ROUTE:1 creating a user using : POST '/api/auth/creatuser'  NO login required.
router.post('/createuser',
    [
        body('name', "Enter a valid username , min length 3").isLength({ min: 3 }),
        body('email', "Enter a valid email").notEmpty(),
        body('password', "Enter a valid password , min len 5").isLength({ min: 5 }),
    ], async (req, res) => {
        //using async function
        let success = false;
        const errors = validationResult(req);
        //if validation is false
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array });
        }

        console.log(req.body);

        //checking if user with same email already exits
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({success, error: "this email with user already exists" });
        }
        else {
            //creating a new user
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                password: hash,
                email: req.body.email,
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);

            //console.log(authToken);

            // await res.json(user);
            success = true;
            await res.json({success, authToken: authToken });
        }

    });


//ROUTE:2 login a user using : POST '/api/auth/login'  NO login required.
router.post('/login',
    [
        body('email', "Enter a valid email").notEmpty(),
        body('password', "Password cannot be blank").exists(),
    ], async (req, res) => {

        let success = false;

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email: email });

            if (!user) {
                 res.status(400).json({ error: "Enter valid credentials" });
            }
            else {
                let passwardCompare = await bcrypt.compare(password, user.password);

                if (passwardCompare) {

                    const data = {
                        user: {
                            id: user.id,
                        }
                    }

                    const authToken = jwt.sign(data, JWT_SECRET);
                     success=true;

                     res.json({success, authToken: authToken });
                }
                else {
                    res.status(400).json({success, error: "Enter valid credentials" });
                }
            }



        } catch (error) {
            res.status(500).json({success, error: "Some internal server error" });
        }

    });


//ROUTE:3 to get details of user  LOGIN required

//fetchuser is a middleware
router.post('/getuser',fetchuser, async (req, res) => {

        try {
            const user_id = req.user.id;
            //select use krne se ham specify kr skte hai kya kya lena aur user mae se and kya nhi lena
            //jaise yahan password nhi lena to "-password kr diye"
            const user = await User.findById(user_id).select("-password");

            res.send(user);

        } catch (error) {
             res.status(500).json({ error: "Some internal server error" });
        }


    });

module.exports = router;
