const User = require ('../models/User.js');
const jwt = require('jsonwebtoken');
const Document=require('../models/Document.js')

const secret = 'ma_clé_secrète_super_sécurisée';

exports.index = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.show = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

exports.store = async (req, res) => {

  try {
    console.log('Headers:', req.headers);
    console.log('Received data:', req.body);
    console.log('Received file:', req.files);
    const documents = req.files ? req.files.map(f => f.path) : [];
    const newUser = new User({ ...req.body, documents });
    //const newUser = new User({...req.body,documents:[req.file.path]});
    await newUser.save();
    res.json({ message: 'User created successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user', err: err.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

exports.connect = async (req, res) => {

  const {email , password} = req.body
  console.log(req.body)

  let user = await User.findOne({ email });
  console.log(user)
  if (!user) {

    console.log("Utilisateur non trouvé");
    res.status(500).json({ message: 'Error deleting user' })
  }
  if(user.password == password) {

    const token= jwt.sign({ id: user._id, email: user.email },secret,{expiresIn: '1h'})
    console.log("Token généré:", token);
     //res.cookie("token", token, { httpOnly: true, secure: false });
      
     console.log("Connexion réussie pour l'utilisateur:");
     res.status(200).json({ message: 'Connexion réussie', token: token });
    // req.session.user = user;
    // res.redirect("/profil");
  }
  else {

    console.log("Utilisateur non trouvé");
    return res.redirect("/login");
  }
}

exports.document= async (req,res)=>{

try{
//    let docExistser =  Document.find({})
//     if(doc)
    const userId = req.body.userId
    const type=req.body.type

    if (!userId) {
            return res.status(400).json({ message: 'userId is not defined' });
        }

    let document= new Document({type:type,userId:userId})
    await document.save();
    res.status(201).json({message: "Demande envoyée"});
   
} catch (err) {

        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
 

}

exports.user = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





// exports.user = async (req, res) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Token manquant' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, secret);
//         console.log('Contenu du token décodé :', decoded);

//         const user = await User.findById(decoded.id);

//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur introuvable' });
//         }

//         res.status(200).json(user);
//     } catch (err) {
//         console.error(err);
//         return res.status(401).json({ message: 'Token invalide' });
//     }
// };

