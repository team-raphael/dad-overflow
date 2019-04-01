# Dad-Overflow
## About
The life of a parent can be an overflow-ing mess. Need help to sort it out? Then head to *Dad Overflow*. Developed by Dads for dads.

## FEATURES
 * Read and search posts from other dads
 * Create posts to ask or answer questions
 * Comment on existing posts
 * Make To-do lists to complete tasks
 * Pick a unique user icon

### Link to site
 * www.dad-overflow.com
 
## Development Team
  * Chris McLaughlin
  * Noel Nevarez
  * Anton Kogan
  * Min Joseph
  * Cody Jarrett

# Steps to Run Application
## For Online Usage
Must be a member thats is logged in to use most of website features.
## For Local Usage
1. 'git Clone or download files'
2. "git pull"  
3. Install node packages with command line using:
  ```
npm install
  ```
# How to use Dad-Overflow(In-Progress)

## Index

| Table of Content      |                 
| ----------------------|
| A. [Sign up](#a-signing-up)            | 
| B. [Logging in](#b-logging-in)         | 
| C. [Forum Page](#c-forum-page)         |
| D. [Commenting..](#d-commenting-on-a-topic)       |                        
| E. [To Do's](#e-to-dos-page)            |                         

## A. Signing up 
### Using Desktop 
1. On the Top right click login/signup
2. Four options is avalable for User to choose 
* Sign in with email
* Sign in with Google
* Sign in with Facebook
* Sign in with Twitter
### Using Mobile
1. On the Top left click hamburger icon to access login/signup button
2. Four options is avalable for User to choose 
* Sign in with E-mail
* Sign in with Google
* Sign in with Facebook
* Sign in with Twitter
### If signing in with E-mail for the first time
1. Type your desired E-mail address and click next
* If you never signed up, name and password questions will appear 
2. Type in your first and last name
3. Type desired password under 'choose password'
4. Click save  
5. Select Profile Image
6. Press save to finally be a member

## B. Logging In 
### Using Desktop 
1. On the Top right click login/signup
2. Four options is avalable for User to choose log-in 
* Sign in with email
* Sign in with Google
* Sign in with Facebook
* Sign in with Twitter
### Using Mobile
1. On the Top left click hamburger icon to access login/signup button
2. Four options is avalable for User to choose to log-in
* Sign in with E-mail
* Sign in with Google
* Sign in with Facebook
* Sign in with Twitter Forum
### Logging in With E-mail
1. After clicking sign up with E-mail, type the email previously used and press the *Next button.
* If approached with name and choose password question, you likely never signed in with us. Please follow "Signing up" Directions/qustions or use another E-mail address.
2. Password question should appear.
3. Press *Next* button below. 
* If the email and password you entered don't match..
* Press *Trouble signing in?*
* Type Dad-Overflow associated E-mail to recieve directions to change password.
4. Welcome back to Dad-Overflow!
## C. Forum Page
This is the homepage where you find all the posts posted by Dad-Overflow members. This is the is the core feature thats runs this site. 
### On Desktop computer
Link to "Forum" page is located on the top right of the nav bar.
### On mobile 
The link is located in hamburger icon when clicked.
### Creating a post in the Forum page
In order ask dads a questions:
1. Press the yellow circle containing a plus sign on bottom right of the page.
2. Type title to create name the subject.
3. Type in details bout the subject of your post.
4. Press *Submit* when your done.
## D. Commenting on a topic
Commenting on posts is simple. This feature is Available in the the forum page.
1. Click on post you would like to comment in by pressing the header or subject title underlined with green.
2. You will be directed to a more detailed pager of the post.
3. Click *Post a reply*
4. type in comment
5. Click the *Reply* button when you are ready.
## E. To-Dos Page 
A page where dads can keep track of task that must be done. Be a dad on his "A" game with this feature.
### Adding a task
1. look for the yellow plus circle sign.
2. click *Add a task*
3. type task
4. Task automatically gets placed under incomplete.
### Putting a task under complete or incomplete
You have the choice to either check  or uncheck a task by pressing on the box next to your task.
a. In incomplete, pressing the box takes the task to complete.
b. In complete,  pressing the box brings it back to incomplete. 
### Deleting task
You can delete task in Incomplete/Complete simply with trash can button.
# Powered By The Following 

  | Tech                  |  New Tech               |
  | ----------------------|:-----------------------:|
  | React.js              | FireBase Authentication | 
  | Node.js               | Google Domain           |
  | Materialize           | Flaticon                |
  | JavaScript            | Moment.js               |  
  | jQuery                | Font Awesome            |
  | Cascading Style Sheet | AOS Animate Scroll Library|
  | HTML5                 |                         |

# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.
