const express = require("express");
const { createUser,  getallUser, getUser, deleteUser, updateUser,loginUserCtrl} = require("../controller/userCtrl");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users", getallUser);
router.get("/tasks/:id", authMiddleware, getUser);
router.post("/users", createUser);
router.put("/tasks/:id", authMiddleware, updateUser);
router.delete("/tasks/:id", deleteUser);
router.post("/user/login",loginUserCtrl);


module.exports = router;