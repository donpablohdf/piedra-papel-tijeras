import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from random import choice

load_dotenv()

app_secret_key = os.getenv('SECRET_KEY')
if app_secret_key is None:
    raise ValueError(
        "No se ha especificado la clave secreta de la aplicación.")

# Crear la aplicación Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = app_secret_key

CORS(app)

CHOICES = ['piedra', 'papel', 'tijeras']


@app.route('/play', methods=['POST', 'GET'])
def play():
    # Generar aleatoriamente la tirada del ordenador
    computer_choice = choice(CHOICES)
    return jsonify({'computerChoice': computer_choice})


history = []


@app.route('/history', methods=['POST'])
def update_history():
    global history
    if len(history) == 10:
        history = []
    new_history = request.json
    history.append(new_history)
    return jsonify(history)


@app.route('/reset', methods=['POST'])
def reset_history():
    global history
    history = []
    return jsonify({"message": "Reset history"})


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=PORT, debug=False)
