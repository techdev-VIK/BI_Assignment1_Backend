const express = require('express');

const app = express();


const cors = require("cors");


const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));



const {intializeDatabase} = require('./db/db.connect');


const Meetup = require('./models/meetup.models');

app.use(express.json());

intializeDatabase();


//Home page Route

app.get('/', async(req, res) => {
    res.send('Welcome to Meetup Events - Home Page')
})


//Create Meetup route

async function createMeetup(newMeetup){
    try {
        const meetup = new Meetup(newMeetup);
        await meetup.save();
        return meetup;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


app.post('/createMeetup', async (req, res) => {
    try {
        const savedMeetup = await createMeetup(req.body);
        res.status(200).json({message: 'Meetup added successfully!', meetup: savedMeetup});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to add meetup'})
    }
})


// Read All Meetups Route

async function readMeetups() {
    try {
        const readAll = await Meetup.find();
        return readAll;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


app.get('/allMeetups', async (req, res) => {
    try {
        const readByMeetups = await readMeetups();

        if(readByMeetups){
            res.json(readByMeetups)
        }else{
            res.status(404).json({error: 'Meetups not found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Server Error. Please try again later!'})
    }
})


//Read meetups by title:

async function readByTitle(meetupTitle) {
    try {
        const readTitles = await Meetup.findOne({title: meetupTitle});
        return readTitles;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

app.get('/meetup/:title', async (req, res) => {
    try {
        const readTitles = await readByTitle(req.params.title);

        if(readTitles){
            res.json(readTitles)
        }else{
            res.status(404).json({error: 'Meetup not found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Server Error. Please try again later!'})
    }
});


//Read meetups by tag:

async function readByTag(meetupTag) {
    try {
        const readTag = await Meetup.find({eventTags: meetupTag});
        return readTag;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

app.get('/meetup/tags/:tag', async (req, res) => {
    try {
        const readTag = await readByTag(req.params.tag);

        if(readTag){
            res.json(readTag)
        }else{
            res.status(404).json({error: 'Meetup not found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Server Error. Please try again later!'})
    }
});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})