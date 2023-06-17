const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;
// Configurações da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tanamao',
  password: '150908mario',
  port: 5432, // Porta padrão do PostgreSQL é 5432
});


// Configuração do middleware para o parsing do corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
// Rota inicial para renderizar a página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Rota para obter os usuários do banco de dados
app.get('/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

// Rota para adicionar um novo usuário ao banco de dados
app.post('/users', async (req, res) => {
  const { username, password, email, cpf } = req.body;

  try {
    const query = 'INSERT INTO users (username, password, email, cpf) VALUES ($1, $2, $3, $4)';
    const values = [username, password, email, cpf];

    await pool.query(query, values);
    res.send('Usuário adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    res.status(500).send('Erro ao adicionar usuário');
  }
});

// Rota para excluir um usuário do banco de dados
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [userId];

    await pool.query(query, values);
    res.send('Usuário excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).send('Erro ao excluir usuário');
  }
});



// Configuração do middleware para o parsing do corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota inicial para renderizar a página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota para obter os usuários do banco de dados
app.get('/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

// Rota para adicionar um novo usuário ao banco de dados
app.post('/users', async (req, res) => {
  const { username, password, email, cpf } = req.body;

  try {
    const query = 'INSERT INTO users (username, password, email, cpf) VALUES ($1, $2, $3, $4)';
    const values = [username, password, email, cpf];

    await pool.query(query, values);
    res.send('Usuário adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    res.status(500).send('Erro ao adicionar usuário');
  }
});

// Rota para excluir um usuário do banco de dados
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [userId];

    await pool.query(query, values);
    res.send('Usuário excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).send('Erro ao excluir usuário');
  }
});

