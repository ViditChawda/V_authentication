const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user_model')

mongoose.connect('mongodb+srv://viditchawda301:T0hhjTL2mbdh6icM@cluster0.xnqc0lr.mongodb.net/Authentication?retryWrites=true&w=majority')

app.use(cors())
app.use(express.json())

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('MongoDB connected successfully');
});

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).json({ status: 'ok', user });
    } catch (err) {
        console.log(err)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            res.status(400).json({ status: 'error', error: 'Duplicate Email' });
        } else {
            // Other errors
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }
});


app.post('/api/login', async (req, res) => {
    console.log('ajsdf', req.body)
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        console.log(user)
        if (user) {
            return res.json({ status: 'ok', user: true })
        } else {
            return res.json({ status: 'error', user: false })
        }
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.listen(1337, () => {
    console.log('Server started on 1337')
})