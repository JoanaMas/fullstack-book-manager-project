# Book Manager Project by Joana Mastianica

## About The Project

This is my first own created book manager project from scratch, and my inspiration source: [goodreads](https://www.goodreads.com/?ref=nav_hom).

Project purpose was to combine all the front-end & back-end knowledge aquired in 6 months lasting JavaScript/Typescript fullstack course at codeacademy.lt. 

Project was created using JavaScript (React framework). 

This project it is really important work of mine, as it gave me opportunity to gain a better understanding on how front-end connects to back-end & database. Working on this project solely and taking full ownership of an outcome made me solve multiple problems, that I never faced before.

During this project, I gained deeper knowledge of:

* Make request from front and send them to back
* Make request from database (mongoDB) and send response to front
* Implement validations from back using middleware function & send response HTTP statuses & validation messages to front
* Get data by conditions from database
* Use redux state management system
* React components decomposition & more

Couple problem I was working on:

* I have learned that current user should be always present in order to be logged in user account. If application is developed by adding new pages & funcionalities, current user state was esential for it to connecting with further actions.
* It also made me strategise with the sequence of steps that should be taken to expand application by adding more actions to it.
* The toughest part was to create realationships between data & find ways to connect it when needed.

<br>

## Project Funcionality

* User registration
* User log in / log out
* Update profile picture
* Create book you are currently reading
* Delete book from your currently reading book list
* Mark book as finished to read
* Finished books are stored to library
* Single book page with posibility to write notes from the book
* Write, delete & update book note
* Counter for books finished that are stored in library
* Counter for total pages read
* Responsive design

*Note: Project video added to see functionality of a project.*

[Project Video](./client/fullstack-book-manager-project/public/www_screencapture_com_2023-5-8_12_08.mp4)
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

*Note: Tools and libraries used in this project are not complete list of total knowledge aquired during my studies & individual practise.*

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

Run server:

```
npm run server
```

<br>

# View code:

You can view code of application in [Online GitHub Editor](https://github.dev/JoanaMas/fullstack-book-manager-project).


