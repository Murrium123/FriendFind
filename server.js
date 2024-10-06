const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }))


mongoose.connect('mongodb+srv://adamchakour05:C5ygFeBcxpPDaNg2@ffcluster.8ojuf.mongodb.net/FFdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.once('open', () => {
    console.log("Connected to MongoDB")
})

const userSchema = new mongoose.Schema({
    name: String,
    pronoun: {
        type: String,
        enum: ['he/him', 'she/her', 'they/them'],
    },
    interest1: {
        type: String,
        enum: ['Movies', 'TV', 'Video Games', 'Books', 'Music', 'Travel', 'Cooking'],
    },
    interest2: {
        type: String,
        enum: ['Movies', 'TV', 'Video Games', 'Books', 'Music', 'Travel', 'Cooking'],
    },
    interest3: {
        type: String,
        enum: ['Movies', 'TV', 'Video Games', 'Books', 'Music', 'Travel', 'Cooking'],
    },
    question1: { type: String, default: '' },
    answer1: { type: String, default: '' },
    wrong1a: { type: String, default: '' },
    wrong1b: { type: String, default: '' },
    wrong1c: { type: String, default: '' },
    question2: { type: String, default: '' },
    answer2: { type: String, default: '' },
    wrong2a: { type: String, default: '' },
    wrong2b: { type: String, default: '' },
    wrong2c: { type: String, default: '' },
    question3: { type: String, default: '' },
    answer3: { type: String, default: '' },
    wrong3a: { type: String, default: '' },
    wrong3b: { type: String, default: '' },
    wrong3c: { type: String, default: '' },
});

const Users = mongoose.model("data", userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/form2', (req, res) => {
    res.sendFile(path.join(__dirname, 'FFInterestPage.html')); // Path to Form 2
});

app.post('/post', async (req, res) => {
    const { name, pronoun, interest1, interest2, interest3 } = req.body
    const user = new Users({
        name,
        pronoun,
        interest1,
        interest2,
        interest3
    })
    try {
        await user.save()
        console.log(user)
        res.send("Form Submission Successful")
    } catch(error) {
        console.log(error)
        res.send("Form Submission Failed")
    }
})

// Handle form submissions (from both forms)
app.post('/submitForm', (req, res) => {
    let formData = {};

    // Check if it's Form 1 (name and pronouns)
    if (req.body.irq1 && req.body.ca1 && req.body.wa1_1 && req.body.wa1_2 && req.body.wa1_3 ) {
        formData = {
            question1: req.body.irq1,
            answer1: req.body.ca1,
            wrong1a:  req.body.wa1_1,
            wrong1b:  req.body.wa1_2,
            wrong1c:  req.body.wa1_3,
        };
    }

    if (req.body.irq2 && req.body.ca2 && req.body.wa2_1 && req.body.wa2_2 && req.body.wa2_3 ) {
        formData = {
            question2: req.body.irq2,
            answer2: req.body.ca2,
            wrong2a:  req.body.wa2_1,
            wrong2b:  req.body.wa2_2,
            wrong2c:  req.body.wa3_3,
        };
    }

    if (req.body.irq3 && req.body.ca3 && req.body.wa3_1 && req.body.wa3_2 && req.body.wa3_3 ) {
        formData = {
            question3: req.body.irq2,
            answer3: req.body.ca3,
            wrong3a:  req.body.wa3_1,
            wrong3b:  req.body.wa3_2,
            wrong3c:  req.body.wa3_3,
        };
    }


    // Insert the correctly structured data into MongoDB
    collection.insertOne(formData, (err, result) => {
        if (err) {
            res.status(500).send('Error saving form data to database.');
        } else {
            res.send('Form data saved to MongoDB successfully.');
        }
    });
});
app.listen(port, () => {
    console.log("Server Started")
})
