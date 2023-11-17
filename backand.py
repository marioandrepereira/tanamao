from flask import Flask, request, jsonify

app = Flask(__name__)

# Função para cadastrar um novo usuário
def cadastrar_usuario(username, email, password, cpf):
    with open('users.txt', 'a') as file:
        file.write(f"{username},{password},{email},{cpf}\n")


# Função para autenticar um usuário
def autenticar_usuario(username, password):
    with open('users.txt', 'r') as file:
        for line in file:
            stored_username, stored_password = line.strip().split(',')[:2]
            if username == stored_username and password == stored_password:
                return True
    return False


# Rota para cadastrar um novo usuário
@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    cpf = data.get('cpf')


    cadastrar_usuario(username, email, password, cpf)
   
    return jsonify({'message': 'Usuário cadastrado com sucesso!'})


# Rota para autenticar um usuário
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')


    if autenticar_usuario(username, password):
        return jsonify({'message': 'Login bem-sucedido!'})
    else:
        return jsonify({'message': 'Usuário ou senha inválidos'}), 401


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)