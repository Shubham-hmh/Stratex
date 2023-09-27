const express = require("express");
const db = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const app =express();
const dotenv =require('dotenv').config();
const port =process.env.port || 5000;
const cookieParser =require("cookie-parser");
const morgan =require("morgan");
const authRouter =require("./routes/authRoute");


const cors = require("cors");

db();
app.use(express.json());
app.use(cors());     
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api",authRouter);




app.use(notFound);
app.use(errorHandler);
 app.listen(port , ()=>{
    console.log(`server is running on port : ${port}`);
 })