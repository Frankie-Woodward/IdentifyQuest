# IdentifyQuest
A Facial Recognition Application using AI to generate images

Welcome to Identify Quest, the application which allows users to create ai-generated composite sketches of individuals who have committed a crime and save them to submit to their local 911 emergency teams.

## Wire Frames
![Alt text](image.png)
![Alt text](image-2.png)


## GitHub Repository and Heroku Host Site

GitHub - https://github.com/Frankie-Woodward/IdentifyQuest.git
Heroku - https://identify-quest-cd810d9e776b.herokuapp.com

## User Stories

**Crime Image generator and local emergency response contact information** 

The ability to identify someone that committed a crime is going to be made easier with ai integration. 

As a user I want to: 
1. be able to test the facial recognition product before I sign up

2. describe in great detail the features of the individual suspect to allow 
the detective to accurately render an image close to the suspect

3. save the image to my profile to be shared with local authorities

4. access to local crime data as well as local emergency contacts

## MVP Goals 

System: AI Image Generator (Detective)
Users:
-	Create profile (with auth as stretch)
-	Chat with AI Detective for them to sketch image of perpetrator
-	Save images to their profile to refer to them when filing police report
-	Have access to local crime data via api
-	Have access to local authority and emergency services via api


## Stretch Goals 

-	Implement AUTH (JWT)
-	Implement openai feature to quiz on random crime facts
-	Implement quiz feature for historical crimes pulled from a trivia api

## List of Technologies Used
    "axios": fetch and communicating between front and backend
    "bootstrap": css framework for navbar
    "express": middleware
    "mongoose": backend db
    "openai": chat completions and image generation
    "react": frontend
    "nodeJs": node package manager installed

## Installation and Application Use Instructions
    To recreate this project:
    1. Create react app and install npm, express, cors, openai, mongoose, and axios.
    2. Create frontend components that will connect to openai api.
    3. Create backend server.js, controllers, as well as models that make up the schema.
    4. Create a backend.js to communicate between front and backend.
    5. Finally, run npm frontend and npm backend separately.
    6. Open site

    To utilize the working version:
    1. Visit - https://identify-quest-cd810d9e776b.herokuapp.com
    2. Test the site by adding a suspect in great detail
    3. In the navbar, click "join-us!"
    4. Create a unique username and email,  as well as password, and search for your local 911 emergency services.
    5. After creating your profile, click create a new sketch.
    6. Give the AI detective in depth description of suspect.
    7. Once you save the data, you will be taken back to your userprofile to view.


*  Descriptions of any Unsolved problems or major hurdles you had to overcome
*  Descriptions of next steps you have planned for your application 
    -	Implement AUTH (JWT)

