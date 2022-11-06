const express = require('express');
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser} = require('/middleware/authMiddleware');
const { connectToMongoDB } = require('./db');
const routes = require('./routes/blogRoutes')
const blog = require ('./models/blogsModel');
const auth = require ('./controllers/authController');

require("dotenv").config();

const PORT = process.env.PORT

const app = express();

// middleware and static files
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// Connecting to MongoDB Instance
connectToMongoDB()


// basic routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
    
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'about'})
});

// blog routes
app.use( blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
});

// authroutes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/blogs', requireAuth, (req, res) => res.render ('blog'));

app.use('/', authRoutes)
app.use ( body-parser.urlencoded ({extended: true}));

app.listen (PORT, () => {
    console.log(`server listening on port: ${PORT}`)
})