const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routers/api/users');
const profile = require('./routers/api/profile');
const posts = require('./routers/api/posts');

const app = express();

// Body Parer
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

//connect to mongoDB

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

//use routers
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//server static assets if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(_dirname,'client','build','index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

