
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

app.listen(5000, () => console.log('Servidor rodando na porta 5000 🚀'));
