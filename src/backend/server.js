
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('./database.sqlite');

// Cria tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS gastos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    nome TEXT,
    data TEXT,
    categoria TEXT,
    valor REAL,
    parcelas INTEGER
  )
`);

// ROTAS
app.get('/gastos', (req, res) => {
  db.all("SELECT * FROM gastos", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post('/gastos', (req, res) => {
  const { tipo, nome, data, categoria, valor, parcelas } = req.body;
  db.run(
    `INSERT INTO gastos (tipo, nome, data, categoria, valor, parcelas) VALUES (?, ?, ?, ?, ?, ?)`,
    [tipo, nome, data, categoria, valor, parcelas],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, tipo, nome, data, categoria, valor, parcelas });
    }
  );
});

app.delete('/gastos/:id', (req, res) => {
  db.run(`DELETE FROM gastos WHERE id = ?`, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.put('/gastos/:id', (req, res) => {
  const { tipo, nome, data, categoria, valor, parcelas } = req.body;
  const { id } = req.params;

  db.run(
    `UPDATE gastos SET tipo = ?, nome = ?, data = ?, categoria = ?, valor = ?, parcelas = ? WHERE id = ?`,
    [tipo, nome, data, categoria, valor, parcelas, id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ id: parseInt(id), tipo, nome, data, categoria, valor, parcelas });
    }
  );
});




// Cria tabela Entradas se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS entradas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    nome TEXT,
    data TEXT,
    banco TEXT,
    valor REAL
  )
`);

// ROTAS
app.get('/entradas', (req, res) => {
  db.all("SELECT * FROM entradas", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post('/entradas', (req, res) => {
  const { tipo, nome, data, banco, valor } = req.body;
  db.run(
  `INSERT INTO entradas (tipo, nome, data, banco, valor) VALUES (?, ?, ?, ?, ?)`,
  [tipo, nome, data, banco, valor],
  function (err) {
    if (err) {
      console.error("Erro ao inserir entrada:", err); // 👈 ajuda no debug
      return res.status(500).json(err);
    }
    res.json({ id: this.lastID, tipo, nome, data, banco, valor });
  }
);
});

app.delete('/entradas/:id', (req, res) => {
  db.run(`DELETE FROM entradas WHERE id = ?`, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.put('/entradas/:id', (req, res) => {
  const { tipo, nome, data, banco, valor} = req.body;
  const { id } = req.params;

  db.run(
    `UPDATE entradas SET tipo = ?, nome = ?, data = ?, banco = ?, valor = ? WHERE id = ?`,
    [tipo, nome, data, banco, valor, id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ id: parseInt(id), tipo, nome, data, banco, valor });
    }
  );
});



app.listen(5000, () => console.log('Servidor rodando na porta 5000 🚀'));