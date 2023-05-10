# Book Manager Project by Joana Mastianica

## About The Project

This is my first created project from scratch, and my inspiration source for this application was [goodreads](https://www.goodreads.com/?ref=nav_hom).

Project purpose was to combine all the front-end & back-end knowledge acquired in 6 months lasting JavaScript/Typescript fullstack course at codeacademy.lt. 

Project was created using JavaScript (React framework). 

This project is really important work of mine, as it gave me an opportunity to gain a better understanding on how the front-end connects to the back-end & database. Creating this particular application made me solve multiple problems that I never faced before & gain deeper knowledge of how to:

* Make requests from front-end and send them to back-end.
* Make requests from database (mongoDB) and send response to front-end.
* Implement validations from back using middleware function & send response HTTP statuses & validation messages to front.
* Get data by conditions from the database.
* Use redux state management system.
* React components decomposition & more.

<br>

## Project Functionalities

* User registration
* User log in / log out
* Update profile picture
* Create book you are currently reading
* Delete book from your currently reading book list
* Mark book as finished to read
* Finished books are stored to library
* Single book page with possibility to write notes from the book
* Write, delete & update book note
* Counter for books finished that are stored in library
* Counter for total pages read
* Responsive design

*Note: Project video & gif added to see functionality of a project.*

<br>

## Application example

[Project Video](./client/fullstack-book-manager-project/public/www_screencapture_com_2023-5-8_12_08.mp4)

![](./client/fullstack-book-manager-project/public/book-manager-app.gif)

<br>

## Techonologies Used 

<br>

### Front-end

* Vite for work environment configuration
* React framework
* SCSS for styling
* Material UI for Icons
* Redux for state management
* Axios for data fetching

### Back-end

* Node.js environment (v16.17.1)
* Express.js server
* Cors for security
* MongoDB (mongoose) database

*Note: Tools and libraries used in this project are not complete list of total knowledge acquired during my studies & individual practise.*

<br>

## To Run Application 
<br>

1. Save the project to your local enviroment from my [github repository.](https://github.com/JoanaMas/fullstack-book-manager-project)

<br>

2. Open terminal on [server folder](./server) & run these commands in order:<br><br>


Install libraries:

```
npm install
```

Run server:

```
npm run server
```

3. Open terminal on [client folder](./client/fullstack-book-manager-project/) & run these commands in order:<br><br>

Install libraries:

```
npm install
```

Run application:

```
npm run dev
```

4. To test application, you can either register a new user and log in with your created credentials, or use my test account with credentials:<br><br>

```
email: joana@gmail.com  
password: password
```

<br>

# View code:

You can view code of application in [Online GitHub Editor](https://github.dev/JoanaMas/fullstack-book-manager-project).


