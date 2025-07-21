const mongoose = require('mongoose');


//Definition du modèle de données Utilisateur
const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  fname: {
    type: String,
    required: true,
    trim: true
  },
  lname: {
    type: String,
    required: true,
    trim: true
  },
  birth_date: {
    type: Date,
    required: true
  },
  birth_place: {
    type: String,
    required: true,
    trim: true
  },
  nationality: { 
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  validity: { 
    type: Number,
    
  },
  licence_id: {
    type: String,
    required: true,
    trim: true
  },
  licence_date: {
    type: Date,
    required: true
  },
  licence_category: {
    type: String,
    required: true
  },
  documents: [{
    type: String,
    trim: true
  }]
});
//creation du model de données

module.exports=mongoose.model('User', userSchema)
