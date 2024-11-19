const mongoose = require('mongoose');

//create schema
const meetupSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    eventType:{
            type: String,
            enum: ['Online', 'Offline', 'Both'],
            require: true,
    },
    eventPricing: {
        type: Number,
        require: true
    },
    eventDate:{
        type: Date,
        require: true,
    },
    eventTime: {
        type: String,
        reuiqre: true
    },
    eventDetails: {
        type: String,
        require: true,
    },
    dressCode: {
        type: String,
    },
    ageRestrictions: {
        type: String,
    },
    eventTags: [
        {
            type: String,
            require: true,
        }
    ],
    speakers: [
        {
            name: {type: String, require: true},
            jobTitle: { type: String, required: true },
            image: { type: String }, 
        }
    ],
    host: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    }

}, {
    timestamps: true
})

// create model

const Meetup = mongoose.model('Meetup', meetupSchema);


module.exports = Meetup;