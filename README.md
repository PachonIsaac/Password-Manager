# PASSWORD MANAGER

Password Manager is a web application designed to help you manage your passwords securely and conveniently. With this application, you can easily store, edit, and delete passwords from an intuitive and user-friendly interface.

PASSWORD MANAGER handles a simple API created with FastAPI in Python to manage secure keys for a user. The API connects to an SQLite database with two tables, user and password, to store user data and passwords.

Additionally, the front-end is built with React and connects to the API to perform CRUD operations. The web application is responsive and adapts to any device.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running](#running)
- [API Documentation](#api-documentation)

## Technologies Used
- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Python, FastAPI, SQLite

# Installation and Running
To run this project, you will need to have the following installed:

## Python
Make sure Python is installed on your system. You can download the latest version from [Python's official site](https://www.python.org/). Additionally, use an IDE of your choice, in this case, Visual Studio Code was used.

## Virtual Environment (Optional but recommended)
It is recommended to use a virtual environment to isolate the project dependencies. You can create and activate a virtual environment as follows:

```bash
# Install virtualenv
pip install virtualenv

# Create a virtual environment
python -m venv venv
```
## Node.js
Make sure to have Node.js installed on your system. You can download the latest version from https://nodejs.org/

## Project Dependencies
Once you have your virtual environment activated, install the project dependencies using "requirements.txt"

``` bash
pip install -r requirements.txt
```
# Installation
## Activate the Virtual Environment
On Windows

``` bash
.\venv\Scripts\activate
```
On Linux/Mac

``` bash
source venv/bin/activate
```

## Start the Backend Server
With the virtual environment activated and all dependencies installed, you can start the development server with the following command:

``` bash
uvicorn main:app --reload
```	

## Start the Frontend Server
To start the frontend server, navigate to the "frontend" folder and run the following command:

``` bash
npm start
```
Note: The default code runs the backend on port 8000 and the frontend on port 3000. If you want to change these ports, you can do so in the "main.py" file in the backend and in the "package.json" file in the frontend.

# Running
You can run the application with the following command:

```bash
uvicorn main:app --reload
```
This command assumes that the entry point of your application is main and the application instance is app. Adjust as necessary.

Additionally, the terminal will provide the address of the API. To view the API documentation, go to the address provided by the terminal and add "/docs" at the end.

# Frontend Development
All frontend development was done in React, using functional components and hooks. Additionally, Axios was used to make requests to the API.

# API Documentation
## Description
This API provides services related to managing authorized users. Authentication is done using a JWT token obtained upon login. The services offered are as follows:

## Authentication
To access the API services, it is necessary to authenticate, assuming the user has already been created. To do this, a POST request must be made to the /login route with the following body:

``` bash
{
    "username": "admin",
    "password": "1234"
}
```
If the username and password are correct, a JWT token will be obtained, which must be used to access the API services. Additionally, the entire security process was implemented using FastAPI's OAuth2PasswordBearer. For more information on the authentication process, you can refer to the FastAPI documentation: https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/

## Password Services
To access any of the password services, the user must have previously logged in; otherwise, they will not be able to access them. Additionally, using FastAPI's Depends, the JWT token is verified, and the user's information making the request is captured.

-Retrieve Passwords
    To retrieve passwords, a GET request must be made to the /passwords route. The user making the request is identified using get_current_user, and all passwords stored by the user in the database are retrieved.

-Create a Password
    To create a password, a POST request is made, and the user is asked for the password information through Query Parameters, which is then stored in the database. The information consists of:

    length (int): Length of the password
    capital_letters (int): Number of uppercase letters in the password
    numbers (int): Number of numbers in the password
    special_characters (int): Number of special characters in the password

    With this information, a random password that meets the user's requirements is generated.

-Update a Password
    To update a password, a PUT request is made, and the user is asked for the password information through Query Parameters, which is then updated in the database. The information consists of:

    password_id (int): ID of the password to update
    length (int): Length of the new password
    capital_letters (int): Number of uppercase letters in the new password
    numbers (int): Number of numbers in the new password
    special_characters (int): Number of special characters in the new password

    With this information, a random password that meets the user's requirements is generated.

-Delete a Password
    To delete a password, a DELETE request is made, and the user is asked for the password information through Query Parameters, which is then deleted from the database. The information consists of:

    password_id (int): ID of the password to delete

