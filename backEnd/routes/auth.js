const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


const { body, validationResult } = require("express-validator");


router.post(
  "/create",
  [
       // Validations for the User
 
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Enter the valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
      try {

        // If user already registered

    let cUser = await User.findOne({ email: req.body.email });
    // bcrypt Function

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt)
      console.log(secPassword)

    if (cUser) {
      return res.status(400).json({ error: "User already exist" });
    } else {

          // Create User

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      }).catch((err) => {
        res.json({
          error: "Please enter a unique value",
          message: err.message,
        });
      });
           // Error show

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      return res.status(200).json(user);
    }
      }catch(error) {
        console.log(error.message)
      }
  }
);

module.exports = router;
