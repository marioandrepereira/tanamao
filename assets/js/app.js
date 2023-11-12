const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loginForm = document.querySelector(".sign-in-form");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});



function formatCPF(cpf) {
  // remove qualquer caractere que não seja um número
  cpf.value = cpf.value.replace(/\D/g, '');

  // verifica se todos os dígitos são iguais e, em caso afirmativo, retorna um CPF inválido
  if (/^(\d)\1{10}$/.test(cpf.value)) {
    cpf.value = '';
    return cpf;
  }

  // limita o número de dígitos ao número total de dígitos de um CPF
  if (cpf.value.length > 11){
    cpf.value = cpf.value.slice(0, 11);
  }

  // adiciona os pontos e o traço conforme o usuário preenche
  cpf.value = cpf.value.replace(/^(\d{3})(\d)/g, '$1.$2');
  cpf.value = cpf.value.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
  cpf.value = cpf.value.replace(/\.(\d{3})(\d)/g, '.$1-$2');
  return cpf;
}
document.getElementById('cadastro-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const cpf = document.getElementById('cpf').value;

  const data = {
      username: username,
      email: email,
      password: password,
      cpf: cpf
  };

  // Realiza a requisição para a API Flask
  fetch('/api/create_user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(responseData => {
      if (responseData.message) {
          alert(responseData.message);  // Você pode querer redirecionar o usuário ou fazer outras ações aqui
      } else {
          console.error('Resposta da API não reconhecida:', responseData);
      }
  })
  .catch(error => {
      console.error('Erro na requisição:', error);
  });
});

// Função para formatar o CPF
function formatCPF(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
  } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
  }
  input.value = value;
}



