const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: "Non autorisé (token manquant)." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "changeme");
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    if (!user.status) {
      return res.status(401).json({ message: "Compte désactivé." });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token invalide." });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré." });
    }
    res.status(401).json({ message: "Non autorisé." });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé. Privilèges insuffisants." });
    }
    next();
  };
};