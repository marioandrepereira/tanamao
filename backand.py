from flask import Flask, request, jsonify
from flask_cors import CORS  # Importe o módulo CORS

app = Flask(__name__)
CORS(app)  # Ative o CORS para todos os caminhos da sua aplicação


# Função para obter informações do perfil do usuário
def obter_informacoes_perfil(username):
    with open('users.txt', 'r') as file:
        for line in file:
            stored_username, _, stored_email, _ = line.strip().split(',')
            if username == stored_username:
                return {
                    'username': stored_username,
                    'email': stored_email
                }
    return None

# Rota para obter o perfil do usuário
@app.route('/perfil', methods=['GET'])
def perfil():
    try:
        # Obter o token do cabeçalho
        token = request.headers.get('Authorization').split(' ')[1]

        # Implementar lógica para obter o username associado ao token
        # Substitua a lógica abaixo pela sua implementação real
        username = 'usuario_teste'

        # Obter informações do perfil
        informacoes_perfil = obter_informacoes_perfil(username)

        if informacoes_perfil:
            return jsonify(informacoes_perfil)
        else:
            return jsonify({'error': 'Perfil não encontrado'}), 404

    except IndexError:
        return jsonify({'error': 'Token não fornecido'}), 401
    except Exception as e:
        return jsonify({'error': f'Erro: {str(e)}'}), 500
    
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
