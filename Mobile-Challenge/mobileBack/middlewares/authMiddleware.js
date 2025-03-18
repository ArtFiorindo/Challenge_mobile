const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Nenhum token fornecido!' });
  }

  // Extract the token from Bearer format
  const bearerToken = token.split(' ')[1];

  jwt.verify(bearerToken, 'secreta-chave', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado!' });
    }
    
    // Add the decoded user information to the request object
    req.user = decoded;
    
    next();
  });
};

module.exports = authMiddleware;