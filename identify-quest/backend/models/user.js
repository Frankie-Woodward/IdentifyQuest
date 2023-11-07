const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: { 
        type: String,
        unique: true,
        required: true,
    },
	username: { 
        type: String,
        unique: true,
        required: true,
    },
	password: { 
        type: String,
        unique: true,
        required: true,
    },
	crime_location: { 
        type: String,
        unique: true,
        required: false,
    },
	emergency_contacts: { 
        type: String, 
        minlength: 6,
        required: false,
    },
	sketch: { 
        type: String, 
        minlength: 6,
        required: false,
    },
})

module.exports = mongoose.model('User', UserSchema)
