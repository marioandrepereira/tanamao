from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)

# Configurações do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@localhost/nome_do_banco'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secretpassword'

# Inicialização das extensões
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Definição do modelo de usuário
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)

# Rota para criar um usuário de forma segura
@app.route('/api/create_user', methods=['POST'])
def create_user():
    data = request.get_json()

    # Verifica se o nome de usuário, e-mail e CPF já estão em uso
    existing_user = User.query.filter_by(username=data['username']).first()
    existing_email = User.query.filter_by(email=data['email']).first()
    existing_cpf = User.query.filter_by(cpf=data['cpf']).first()

    if existing_user:
        return jsonify({'message': 'Nome de usuário já em uso. Escolha outro.'}), 400
    elif existing_email:
        return jsonify({'message': 'E-mail já em uso. Escolha outro.'}), 400
    elif existing_cpf:
        return jsonify({'message': 'CPF já em uso. Escolha outro.'}), 400

    # Hash da senha antes de armazenar no banco de dados
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_password, cpf=data['cpf'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuário criado com sucesso!'})

# Rota para autenticar um usuário e obter um token JWT
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token, message='Login bem-sucedido!')
    else:
        return jsonify({'message': 'Falha na autenticação'}), 401

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
