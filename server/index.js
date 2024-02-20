const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user_model')

mongoose.connect('mongodb+srv://viditchawda301:T0hhjTL2mbdh6icM@cluster0.xnqc0lr.mongodb.net/?retryWrites=true&w=majority')

app.use(cors())
app.use(express.json())

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.send({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate Email' })
    }
})

app.post('api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
})

app.listen(1337, () => {
    console.log('Server started on 1337')
})