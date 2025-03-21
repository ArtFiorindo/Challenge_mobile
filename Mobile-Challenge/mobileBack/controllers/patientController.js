const db = require('../db/database');

// Cria um novo paciente com status padrão "pendente"
exports.createPaciente = (req, res) => {
  const { nome, cpf, dataNascimento, sinistro, descricao } = req.body;
  const status = 'pendente'; // Status padrão ao criar

  db.run(
    "INSERT INTO pacientes (nome, cpf, dataNascimento, sinistro, descricao, status) VALUES (?, ?, ?, ?, ?, ?)",
    [nome, cpf, dataNascimento, sinistro, descricao, status],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar paciente' });
      }
      res.status(201).json({ id: this.lastID, nome, cpf, dataNascimento, sinistro, descricao, status });
    }
  );
};

// Obter todos os pacientes
exports.getPacientes = (req, res) => {
  db.all("SELECT * FROM pacientes", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter pacientes' });
    }
    res.status(200).json(rows);
  });
};

// Obter um paciente específico pelo ID
exports.getPacienteById = (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM pacientes WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar paciente' });
    }
    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ error: 'Paciente não encontrado' });
    }
  });
};

// Atualizar um paciente
exports.updatePaciente = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, dataNascimento, sinistro, descricao } = req.body;

  db.run(
    "UPDATE pacientes SET nome = ?, cpf = ?, dataNascimento = ?, sinistro = ?, descricao = ? WHERE id = ?",
    [nome, cpf, dataNascimento, sinistro, descricao, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar paciente' });
      }
      if (this.changes) {
        res.status(200).json({ message: 'Paciente atualizado com sucesso' });
      } else {
        res.status(404).json({ error: 'Paciente não encontrado' });
      }
    }
  );
};

// Deletar um paciente
exports.deletePaciente = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM pacientes WHERE id = ?", [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar paciente' });
    }
    if (this.changes) {
      res.status(200).json({ message: 'Paciente deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Paciente não encontrado' });
    }
  });
};

// Atualizar o status de um paciente
exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(
    "UPDATE pacientes SET status = ? WHERE id = ?",
    [status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar status do paciente' });
      }
      if (this.changes) {
        res.status(200).json({ message: 'Status do paciente atualizado com sucesso' });
      } else {
        res.status(404).json({ error: 'Paciente não encontrado' });
      }
    }
  );
};
