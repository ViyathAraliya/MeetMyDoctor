
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors'); 

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world')
})

mongoose.connect('mongodb://localhost:27017/meetMyDoctor',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


app.use(routes);

app.listen(8080, () => {
    console.log('server is running on port 8080')
})