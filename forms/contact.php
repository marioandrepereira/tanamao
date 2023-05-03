<?php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Faça alguma coisa com os dados recebidos, como verificar se o usuário e a senha estão corretos
    // ...
    // Retorne uma resposta para o JavaScript
    header('Content-Type: application/json');
    echo json_encode(array('success' => true));
  }
?>
