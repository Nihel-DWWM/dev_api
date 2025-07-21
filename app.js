///imports
const express = require('express');
const app = express();
const connectDB = require('./database.js');
const routerUser= require('./routers/router.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // autorise ton front Vite
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(routerUser);
app.use(express.static('uploads')); // pour servir les fichiers statiques dans le dossier uploads
app.use(bodyParser.json());
app.use(cookieParser());

// creation de connexion

connectDB()



app.listen(3000, ()=>{
    console.log('server listning on http://localhost:3000')
})