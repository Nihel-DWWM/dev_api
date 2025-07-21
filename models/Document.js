const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
 type: {
    type: String,
    
  },

  created_at: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: 'verification', // 'pending', 'approved', 'rejected'
    enum: ['verification', 'en cours', 'terminée']
  }
})

module.exports=mongoose.model('Document', documentSchema)