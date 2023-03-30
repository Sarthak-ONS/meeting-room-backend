const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

const userRoutes = require('./routes/user')


app.use(bodyParser.json())

app.get('/home', (req, res, next) => {
    res.status(200).json({ message: 'Success on Home Route.' });
});

app.use('/user', userRoutes);


app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ error: error.message });
});


app.listen(PORT, () => {
    console.log(`App is running on PORT=${PORT}`);
})


