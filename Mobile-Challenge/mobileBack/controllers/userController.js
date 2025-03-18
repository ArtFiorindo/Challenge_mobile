const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');


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

// Login de usuário usando `email`
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Busca o usuário pelo `email`
  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Compara a senha usando bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch || err) {
        return res.status(401).json({ error: 'Email ou senha inválidos' });
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


// Buscar perfil do usuário
exports.getUserProfile = (req, res) => {
  // Obter ID do usuário do token JWT (adicionado pelo middleware de autenticação)
  const userId = req.user.id;
  
  db.get("SELECT id, username, email, role FROM usuarios WHERE id = ?", [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
    }
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Retorna os dados do usuário (exceto a senha)
    res.status(200).json(user);
  });
};

// Atualizar email do usuário
exports.updateUserEmail = (req, res) => {
  const userId = req.user.id;
  const { email } = req.body;
  
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email não pode ser vazio' });
  }
  
  // Verificar se o email já está em uso por outro usuário
  db.get("SELECT id FROM usuarios WHERE email = ? AND id != ?", [email, userId], (err, existingUser) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar disponibilidade do email' });
    }
    
    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está em uso' });
    }
    
    // Atualizar o email do usuário
    db.run("UPDATE usuarios SET email = ? WHERE id = ?", [email, userId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar email' });
      }
      
      res.status(200).json({ message: 'Email atualizado com sucesso' });
    });
  });
};