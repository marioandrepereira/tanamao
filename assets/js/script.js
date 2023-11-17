// script.js

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const cadastroForm = document.getElementById("cadastro-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    fetch("http://10.22.0.250:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === "Login bem-sucedido!") {
          // Armazenar o token no localStorage após um login bem-sucedido
          localStorage.setItem('token', data.token);

          // Redirecionar para perfil.html após um login bem-sucedido
          window.location.href = "perfil.html";
        } else {
          alert("Usuário ou senha inválidos");
        }
      })
      .catch(error => {
        console.error("Error during login API call:", error);
      });
});


  cadastroForm.addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpf = document.getElementById("cpf").value;
  
    const formData = {
      username,
      email,
      password,
      cpf,
    };
  
    try {
      const response = await fetch("http://10.22.0.250:3000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      console.log(data);
  
      if (data.message === "Usuário cadastrado com sucesso!") {
        alert("Usuário cadastrado com sucesso!");
      } else {
        alert("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Error during cadastro API call:", error);
    }
  });  
});
