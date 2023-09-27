const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");

// create user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.emailAddress;
    const findUser = await User.findOne({ emailAddress: email });

    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists!");
    }
});


// update the user
const updateUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
   try {
       const updatedUser = await User.findByIdAndUpdate(id, {
           businessName: req.body.businessName,
           businessNumber: req.body.businessNumber,
           uniqueCode: req.body.uniqueCode,
           externalReference: req.body.externalReference,
           phoneNum: req.body.phoneNum,
           homeAddress: req.body.homeAddress,
           postalAddress: req.body.postalAddress,
           modifyDate: new Date(),
       }, {
           new: true
       });
       res.json({ updatedUser });

   } catch (error) {
       throw new Error(error);
   }
});


// get all user 
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUser = await User.find();
        res.json(getUser);
    } catch (error) {
        throw new Error(error);

    }
})

//get single user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const user = await User.findById(id);
        res.json({
            user
        });
    } catch (error) {
        throw new Error(error);

    }
})

//delete user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const user = await User.findByIdAndDelete(id);
        res.json({ User });
    } catch (error) {
        throw new Error(error);

    }
});


//For user login with email and password that generate token for authorization
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body;
    const findUser = await User.findOne({ emailAddress: emailAddress });

    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(findUser._id, {
            refreshToken: refreshToken,
        }, { new: true });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });

        res.json({
            _id: findUser._id,
            businessName: findUser.businessName,
            emailAddress: findUser.emailAddress,
            token: generateToken(findUser._id)
        });
    } else {
        throw new Error("Invalid Credentials!");
    }
});


module.exports = {
    createUser,  getallUser, deleteUser,
    getUser, updateUser,loginUserCtrl
}