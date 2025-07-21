const Document = require('../models/Document'); // ajuste le chemin si besoin

exports.getUserDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id });
    console.log(documents)
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};