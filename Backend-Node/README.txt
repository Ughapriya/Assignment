#Install packages
npm install

#Run the code
npm start

#Create database using mariaDB
DatabaseName: user
Table: employees
host: 127.0.0.1
port: 3306

#APIs list
- Get all user details from API - GET request 
    * Example URL: http://localhost:8000/users
- Get particular user details by user ID - GET request
    * Example URL: http://localhost:8000/users/{id}
- Verifify login user credentials - POST request
    * Example URL: http://localhost:8000/users/login 
    Req parameters: {email: ####, password: ####}
    
#Project port : 8000

#Swagger UI 
example: http://localhost:8000/api-docs



