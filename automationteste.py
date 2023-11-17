from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()


# URL do aplicativo
url = "http://localhost:3000"

try:
    # Teste de Login
    driver.get(url + "/login")

    # Preencher formulário de login
    username_input = driver.find_element("name", "username")
    password_input = driver.find_element("name", "password")
    submit_button = driver.find_element("tag name", "button")

    username_input.send_keys("Mario")
    password_input.send_keys("123456")
    submit_button.click()

    # Aguardar o redirecionamento para a página de perfil
    time.sleep(2)

    # Verificar se a página de perfil está correta
    assert "perfil.html" in driver.current_url

    # Teste de perfil
    user_name = driver.find_element("id", "user-name").text
    user_email = driver.find_element("id", "user-email").text

    assert user_name == "Nome do Usuário"
    assert "Email:" in user_email

    print("Testes passaram com sucesso!")

finally:
    # Fechar o navegador após a execução do teste
    driver.quit()
