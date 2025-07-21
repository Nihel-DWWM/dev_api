const jwt = require("jsonwebtoken");

const secret = 'ma_clé_secrète_super_sécurisée';
//const secret = "ton_secret"; // Doit être identique à ton secret de connexion

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    console.log('Contenu du token décodé :', decoded);
    req.user = { id: decoded.id };
    console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};