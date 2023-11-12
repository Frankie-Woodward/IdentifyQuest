/* Require modules
---------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const csvController = require('./controllers/csvController');

/* Require the db connection, models, and seed data
---------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const userCtrl = require('./controllers/users')


/* Create the Express app
---------------------------------------------------------- */
const app = express();


/* Middleware (app.use)
---------------------------------------------------------- */
// cross origin allowance
app.use(cors())
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


/* Mount routes
---------------------------------------------------------- */
// This tells our app to look at the `controllers/users.js` file 
// to handle all routes that begin with `localhost:3000/api/users`
app.use('/api/users', userCtrl)
// POST endpoint to save image to MongoDB

app.post('/saveImage', async (req, res) => {
    const { userId, imageUrl } = req.body;
    
    // Logic to save the imageUrl with the userId in MongoDB
    // ...

    res.status(200).send({ message: 'Image saved successfully' });
});
app.get('/api/csv', csvController.filterCSVByCity);


/* Tell the app to listen on the specified port
---------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
