const { Pool } = require('pg');

// Configurações da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tanamao',
  password: '150908mario',
  port: 5432, // Porta padrão do PostgreSQL é 5432
});
pool.on('connect', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

// Exemplo de consulta
pool.query('SELECT * FROM users', (error, result) => {
  if (error) {
    console.error('Erro ao executar a consulta:', error);
  } else {
    console.log('Resultado da consulta:', result.rows);
  }
  
  // Encerrar a conexão com o banco de dados
  pool.end();
});
