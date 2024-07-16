const router = require('express').Router();
const CryptoJS = require('crypto-js');
const Jwt = require("jsonwebtoken");
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res)=>{
    const newUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PAS_SEC).toString()

    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res)=>{
    try {
        
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PAS_SEC);

        const Originslpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        Originslpassword !== req.body.password &&
          res.status(401).json("Wrong password!");
          
          const accesToken = Jwt.sign({
            id: user._id,
            IsAdmin: user.IsAdmin
          }, process.env.JWT_SEC,
          {expiresIn:"3d"});
                         
         const { password, ...others} = user._doc;
            

        res.status(200).json({...others, accesToken});
     } catch (err) {
        res.status(500).json(err);
     }
})



module.exports = router;