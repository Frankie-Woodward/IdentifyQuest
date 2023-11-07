const mongoose = require('mongoose');

const sketchSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        title: { type: String, maxLength: 30 },
        countryId: { type: String, required: true }
    },
    { timestamps: true }
);

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Sketch', sketchSchema);