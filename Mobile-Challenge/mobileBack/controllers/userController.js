const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

// Cadastro de usuário
exports.registerUser = (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    db.run(
      "INSERT INTO usuarios (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
      }
    );
  });
};

// Login de usuário usando `username`
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  // Busca o usuário pelo `username`
  db.get("SELECT * FROM usuarios WHERE username = ?", [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    // Compara a senha usando bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch || err) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos' });
      }

      // Cria o token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, 'secreta-chave', { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
};

// Redefinição de senha usando `email`
exports.resetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  // Busca o usuário pelo `email`
  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica se a nova senha é igual à senha atual
    bcrypt.compare(newPassword, user.password, (err, isSamePassword) => {
      if (isSamePassword) {
        return res.status(400).json({ error: 'A nova senha não pode ser igual à senha atual.' });
      }

      // Criptografa a nova senha
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err.message });

        // Atualiza a senha do usuário com o `email` fornecido
        db.run("UPDATE usuarios SET password = ? WHERE email = ?", [hashedPassword, email], (err) => {
          if (err) {
            return res.status(500).json({ error: 'Erro ao redefinir a senha' });
          }
          res.status(200).json({ message: 'Senha redefinida com sucesso!' });
        });
      });
    });
  });
};
