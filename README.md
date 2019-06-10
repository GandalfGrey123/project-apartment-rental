# GatorRooms

This is an apartment rental website for SFSU students to use during school semeseter to find affordable close distance apartment units close to campus. 

After signing up, using the direct chat messaging system users can easily contact the landlord of the property they are interested in.

#### Website features
* ##### Direct Message Chat
* ##### Account Ceredential security
* ##### Google Maps Distance Calculation
* ##### Multiple File Uploaders
* ##### Avatar and Profile Customization





## Application Stack

This application was built with NodeJS Express, MySQL and ReactJS with Material UI

<img src="https://cdn2.iconfinder.com/data/icons/designer-skills/128/react-512.png" height="90"> <img src="https://cdn4.iconfinder.com/data/icons/logos-3/456/nodejs-new-pantone-black-512.png" height="90"> <img src="https://cdn4.iconfinder.com/data/icons/logos-3/426/mysql-512.png" height="90"> <img src="https://cdn2.iconfinder.com/data/icons/amazon-aws-stencils/100/Non-Service_Specific_copy__AWS_Cloud-512.png" height="90">


### Dev Enivronment
On our aws Linux server we setup 

 - NodeJS v 10.16.0  
 - MySQL v 5.7 
 
 
### Application File Structure

Our application follows the general Express React project structure. We seperated our code into to files `backend` and `frontend` located in the `application`

├── application                   
│   ├── frontend         
│   ├── backend


 
 
### Backend 

We used ExpressJS and the Express router to build our REST API for the front-end actions.

 
 ### FrontEnd
  
For front end acitons, we built our own HTTP request API for endpoint calls which we imported and used directly in our React Components. 


### User Authentication 

We used local storage and session tokens to authenticate user actions and views.

We setup backend utilities for generating session token using JavaScript's built in class and random number generator `Math.Random()`. 

