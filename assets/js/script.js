const { Pool } = require('pg');

// Configurações da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tanamao',
  password: '150908mario',
  port: 5432, // Porta padrão do PostgreSQL é 5432
});

document.addEventListener('DOMContentLoaded', function(){
  const signUpForm = document.querySelector('.sign-up-form');
  signUpForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtenha os valores dos campos de entrada
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const cpf = document.querySelector('#cpf').value;

    // Crie um objeto com os dados do formulário
    const formData = {
      username: username,
      email: email,
      password: password,
      cpf: cpf
    };

    // Execute a consulta SQL para inserir os dados na tabela users
    const query = 'INSERT INTO users (username, email, password, cpf) VALUES ($1, $2, $3, $4)';
    const values = [formData.username, formData.email, formData.password, formData.cpf];

    pool.query(query, values)
      .then(result => {
        // Aqui você pode tratar a resposta do banco de dados, como exibir uma mensagem de sucesso
        console.log('Cadastro realizado com sucesso:', result);
      })
      .catch(error => {
        // Aqui você pode tratar os erros, como exibir uma mensagem de erro
        console.error('Erro ao cadastrar:', error);
      });
  });
});
