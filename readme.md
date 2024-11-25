# Dependencies used are

"dependencies":
"bcryptjs": "^2.4.3",
"dotenv": "^16.4.5",
"express": "^4.21.1"
"jsonwebtoken": "^9.0.2"
"mongoose": "^8.8.2
"nodemon": "^3.1.7

# Npm Install

npm install bcryptjs dotenv express jsonwebtoken mongoose

npm install nodemon --save-dev

Install this dependencies

Then start the project using

# npm run dev (or) node app.js

# Implemented @Role based auth

Folders structure

--> app.js (starting file)

# SRC -->

    -> Controllers
               --> authController.js ( Register,Login,Logout apis logic exists)
    -> Middleware
               --> auth.js (authentication and authorization code exists)
    -> Models
          --> models.js (mongoDB schema exists)
    -> Routes
          -->  authRoutes.js (login,register,logout routes paths exists)
          --> protectedRoutes.js (/admin,/modirator,/user  protected with authorization roles)

# JWT

For user authentication i have used JWT to generate a token using the username and password and role
and then verify it later by getting in response headers

# Bcrypt

for secure password hashing used bcrypt

# Roles

as of now Admin,Modirator,User as default roles has been taken and implemented

# direction to use

1.register(username,password,role)
2.login(username,password)
3.authenticate and authorize middleware will be pased in apis to check the token validity and user role

# AUTH APIS

1. login: http://localhost:5000/api/auth/login
   body: {
   "username":"jeevan",
   "password":"1234"
   }
2. register: http://localhost:5000/api/auth/register
   body: {
   "username":"jeevan",
   "password":"1234",
   "role":"admin"
   }

3. logout: http://localhost:5000/api/auth/logout
   headers: bearerToken : token

# Protected Routes

1. /admin: http://localhost:5000/api/protected/admin
   headers: bearerToken : token
2. /moderator: http://localhost:5000/api/protected/moderator
   headers: bearerToken : token
3. /user : http://localhost:5000/api/protected/user
   headers: bearerToken : token
