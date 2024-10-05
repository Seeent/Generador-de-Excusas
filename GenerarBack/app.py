from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)

API_KEY =os.getenv("OPENAI_API_KEY")

OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

click_count = 0

@app.route('/api/get-count', methods=['GET'])
def get_count():
    global click_count
    
    return jsonify({'count': click_count})

@app.route('/api/increment-count', methods=['POST'])
def increment_count():
    global click_count
    click_count += 1
    return jsonify({'count': click_count})

@app.route('/api/generate-excuse', methods=['POST'])
def generate_excuse():
    data = request.json
    prompt = data.get('prompt', 'Escribe una excusa')

    try:
        response = requests.post(
            OPENAI_ENDPOINT,
            headers={
                'Authorization': f'Bearer {API_KEY}',
                'Content-Type': 'application/json',
            },
            json={
                'model':'gpt-3.5-turbo',
                'messages': [
                    {"role": "system", "content":"generame una excusa graciosa metiendote con el sujeto pero que a la vez sea creible. La frase tiene que ser corta. Lo tienes que decir igual como se lo dirias a un amigo. De una forma coloquial. "},
                    {'role': 'user', 'content': prompt}
                ],
                'max_tokens': 50,
            }
        )
        response.raise_for_status()
        result = response.json()
        return jsonify(result)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
