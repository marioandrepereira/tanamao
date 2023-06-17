const { Pool } = require('pg');
// Configurações da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tanamao',
  password: '150908mario',
  port: 5432, // Porta padrão do PostgreSQL é 5432
});
