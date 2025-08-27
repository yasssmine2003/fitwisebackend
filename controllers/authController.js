const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role,
      email: user.email 
    },
    process.env.JWT_SECRET || "changeme",
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      issuer: process.env.JWT_ISSUER || "your-app-name"
    }
  );
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user);
  
  // Options pour le cookie (optionnel)
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
};

exports.register = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email et mot de passe requis." 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Le mot de passe doit contenir au moins 6 caractères."
      });
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "Email déjà utilisé." 
      });
    }

    // Créer l'utilisateur
    const user = await User.create({
      email: email.toLowerCase().trim(),
      password,
      username: username || email.split("@")[0],
      role: role || "USER",
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error('Register error:', err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur lors de l'inscription." 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email et mot de passe requis." 
      });
    }

    // Trouver l'utilisateur avec le password select explicitement
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ 
        success: false,
        message: "Identifiants invalides." 
      });
    }

    if (!user.status) {
      return res.status(401).json({
        success: false,
        message: "Compte désactivé. Contactez l'administrateur."
      });
    }

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur lors de la connexion." 
    });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Utilisateur introuvable." 
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur." 
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false,
        message: "Tous les champs sont requis." 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Le nouveau mot de passe doit contenir au moins 6 caractères."
      });
    }

    // Trouver l'utilisateur avec le password
    const user = await User.findById(req.user._id).select('+password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "Utilisateur introuvable." 
      });
    }

    // Vérifier le mot de passe actuel
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Mot de passe actuel incorrect." 
      });
    }

    // Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.status(200).json({ 
      success: true,
      message: "Mot de passe mis à jour avec succès." 
    });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur lors du changement de mot de passe." 
    });
  }
};

// Nouvelle fonction pour rafraîchir le token
exports.refreshToken = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur." 
    });
  }
};

// Nouvelle fonction pour logout (invalider le token côté client)
exports.logout = (req, res) => {
  res
    .cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    })
    .status(200)
    .json({
      success: true,
      message: "Déconnexion réussie."
    });
};