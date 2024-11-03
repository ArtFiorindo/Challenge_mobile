const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
console.log(db);

// Cadastro de usuário
exports.registerUser = (req, res) => {
  const { username, password, role = 'user' } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    db.run(
      "INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
      }
    );
  });
};

// Login de usuário
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM usuarios WHERE username = ?", [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch || err) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, 'secreta-chave', { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
};