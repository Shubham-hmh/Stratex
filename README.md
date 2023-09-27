# Stratex
backend Restful api

# clone this repo then run command npm install

# Base url
http://localhost:5000/api/user/login

## for run server type command "nodemon index.js"

For update user and delete user you need to authorize. For this first login with login routes then copy token after login and paste that token in auth section while hitting api request .

## Following routes is mentioned below

### 1. Create User routes: Request type: post 
http://localhost:5000/api/users
### 2. Get all user list routes: Request type : get
http://localhost:5000/api/users
### 3. Get single user by id routes : Request type : get
http://localhost:5000/api/tasks/:userid
### 4. Delete User by id : Request type : Delete (but need token to send for deleting user) attach token in auth section of Postman  while testing api .
http://localhost:5000/api/tasks/:userId
### 5. Update user by id : Request type : put
http://localhost:5000/api/tasks/:userId

### for login routes : Request type : post (token you get after login response)
http://localhost:5000/api/user/login
  


