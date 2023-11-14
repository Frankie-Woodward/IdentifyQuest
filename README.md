# IdentifyQuest
A Facial Recognition Application using AI to generate images.

Welcome to Identify Quest, the application which allows users to create ai-generated composite sketches of individuals who have committed a crime and save them to submit to their local 911 emergency teams.

## HomePage and New User Screenshot
<img width="1728" alt="Screenshot 2023-11-13 at 9 00 13 PM" src="https://github.com/Frankie-Woodward/IdentifyQuest/assets/142553084/f378d087-ae43-4780-bd30-5c3855dad913">
<img width="1728" alt="Screenshot 2023-11-13 at 9 00 29 PM" src="https://github.com/Frankie-Woodward/IdentifyQuest/assets/142553084/d93e04c9-bc69-4917-ac85-d55a6a6cd494">


## Wire Frames
![image](https://github.com/Frankie-Woodward/IdentifyQuest/assets/142553084/dadba441-5d1b-424d-8320-f73933822f48)
![image](https://github.com/Frankie-Woodward/IdentifyQuest/assets/142553084/aecc8b97-7580-4eda-a31a-4326c178b74a)
![image](https://github.com/Frankie-Woodward/IdentifyQuest/assets/142553084/b379f9e6-0c49-450d-8f16-08e254fa86e1)

## GitHub Repository and Heroku Host Site

GitHub - https://github.com/Frankie-Woodward/IdentifyQuest.git
Heroku - https://identify-quest-cd810d9e776b.herokuapp.com

## User Stories

**Crime Image generator and local emergency response contact information** 

The ability to identify someone that committed a crime is going to be made easier with ai integration. 

As a user I want to: 
1. be able to test the facial recognition product before I sign up.

2. describe in great detail the features of the individual suspect to allow 
the detective to accurately render an image close to the suspect.

3. save the image to my profile to be shared with local authorities.

4. access to local crime data as well as local emergency contacts.

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

    openai_api: connect ai to react application

    https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::local-law-enforcement-locations/about
        arcgis based database that houses a plethora of datasets.


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

## Descriptions of Unsolved Problem and Major Hurdles I Overcame

    1. Integrating AI API into react app: led to API Key in environment issues. 
    2. Crime data APIs - API documentation was complex. API connectivity locked behind paywall after waiting for response 
    3. While trying to communicate between front and backend, I realized I had to drop an index in order to update my model schema in mongodb. 
    4. Spent hours trying to finish my controller routes until....I looked very closely to users controller and realized I was using db>user>find instead of db>user>findById
    5. Images are supposed to exist indefintely after being created by AI, but access to them becomes lost after 12-24 hours. I may have to use cloud hosting service as the documentation doesn't address this issue.
    6. When trying to implement 911 services into the app, the API had poor documentation and it was next to impossible to find an endpoint. I had to create a csv file downloaded from somewhere. I learned how to access csv files and that they should be initialized within the backend
    7. Had to incorporate conditional rendering to show the video by default on the sketch page as well as, upload my mp4 to youtube as I had many issues trying to push the mp4 to github
    8. Incorporated the use of react's useParams and useRef in order to access user ID in the browser's url and to specify which data will be mutable while creating images through AI

*  Descriptions of next steps you have planned for your application 
    -	Implement AUTH (JWT)
    -   More Styling
    -   Adding more prompts for detective AI to create a more human        conversation
    -   Look into a better crime data api

