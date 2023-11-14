const mongoose = require("mongoose");

  
const EmergencyServiceSchema = new mongoose.Schema({
    id: Number,
  name: String,
  address: String,
  city: String,
  state: String,
  telephone: String,
  county: String,
  website: String
});


const SketchSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true,
    },
    suspectDetails: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

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
        required: true,
    },
    emergencyService: {
        type: EmergencyServiceSchema,
        default: () => ({})
    },
    evidence: [SketchSchema],
    
})

module.exports = mongoose.model('User', UserSchema)
