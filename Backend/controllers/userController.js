const asyncHandler = require("express-async-handler");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = asyncHandler(async (req, res)=>{
    const users = await Users.find();
    res.status(200).json(users);
});
const getUser = asyncHandler(async (req, res)=>{
    // res.status(200).json({message: `Get User ${req.params.id}`});
    const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

const createUsers = asyncHandler(async (req, res)=>{
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await Users.create({
    username,
    email,
    password: hashPassword
  });
  
  console.log("User created :", user);
  console.log("User created :", user.trackerMapping);
  res.status(201).json({status:'Success', message:'User Created'});
  //res.status(201).json({message: "Create all Users :: "+ req.body.name});
});
const updateUser = asyncHandler(async (req, res)=>{
    // res.status(200).json({message: `Update User ${req.params.id}`});
    const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedUser = await Users.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedUser);
});

const deletetUser = asyncHandler(async (req, res)=>{
    res.status(200).json({message: `Delete User ${req.params.id}`});
    const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Contact not found");
  }
  
  await Users.deleteOne({ _id: req.params.id });
  res.status(200).json(user);
});

const loginUsers = asyncHandler(async (req, res)=>{
  // res.status(200).json({message: `Update User ${req.params.id}`});
  console.log('Inside login Method');
  console.log("User Name :: "+ req.body.username);
  
const user = await Users.findOne({username: req.body.username});
console.log("hash password :: "+ user.password);
const passVerify = await bcrypt.compare(req.body.password, user.password);
console.log('passVerify :: ',passVerify);
if (user.length == 0 || !passVerify) {
  console.log("error");
  res.status(404).json({message:"User not found"});
}else{
  console.log("after error", user);
  const jwtToken = await jwt.sign({userid: user._id}, process.env.SECRET_KEY);
  res.status(200).json({status:"Success", message:"User Authentic", user, jwtToken});
  }
});

module.exports = {getUsers, createUsers, getUser, updateUser, deletetUser, loginUsers};