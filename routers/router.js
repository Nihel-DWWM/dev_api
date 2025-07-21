const express = require("express");
const router = express.Router();
const UsersController = require('../controllers/controller.js');
const DocumentsController = require("../controllers/DocumentsController.js");
const { verifyToken } = require("../middlewares/authentification.js");

const  multer   =  require ( 'multer' )
const path = require('path')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Configurer le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // dossier de destination
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // nom du fichier
  }
});

// Configuration de multer pour gérer les fichiers uploadé
const upload = multer({ storage: storage });

///routes

router.get('/', (req, res) => {

    res.json({ message: 'Welcome to the API' });
});


router.get('/users', UsersController.index);
router.post('/users/add',upload.array('documents'), UsersController.store);
router.post("/users/login", UsersController.connect);
router.get('/users/me',verifyToken, UsersController.user)
router.post('/users/document',verifyToken,UsersController.document)
router.get("/users/documents", verifyToken, DocumentsController.getUserDocuments);
router.delete('/users/:id', UsersController.destroy);
router.get('/users/:id', UsersController.show);





module.exports = router;