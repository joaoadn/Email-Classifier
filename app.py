import os
import requests
import json
from flask import Flask, request, jsonify, render_template
import fitz # PyMuPDF

# --- Configuração da API da Hugging Face ---
HF_API_TOKEN = os.getenv("HF_TOKEN")
headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}
# Voltamos para o modelo mais estável e rápido para nossa tarefa
API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"

app = Flask(__name__)

def get_ai_analysis(text):
    """
    Função ÚNICA que faz a classificação e geração em uma só chamada,
    com um prompt otimizado.
    """
    # PROMPT MELHORADO:
    # Damos um "papel" para a IA (assistente virtual) e instruções claras.
    prompt = f"""
    Você é um assistente virtual profissional. Sua tarefa é analisar o email abaixo e retornar um objeto JSON.
    O objeto JSON deve ter duas chaves: "categoria" e "sugestao".

    1.  **categoria**: Classifique o email como "Produtivo" se ele claramente exigir uma ação (um pedido, uma pergunta, um problema). Classifique como "Improdutivo" se for apenas uma formalidade (agradecimento, aviso, spam).
    2.  **sugestao**: Escreva uma resposta curta e profissional em português. Se o email for produtivo, sua resposta deve acusar o recebimento e mencionar brevemente o assunto principal do email.

    Email para analisar:
    ---
    {text}
    ---

    JSON de resposta:
    """
    
    payload = {
        "inputs": prompt,
        "parameters": { "max_new_tokens": 100 } # Tokens suficientes para a resposta
    }
    
    response = requests.post(API_URL, headers=headers, json=payload)
    
    if response.status_code != 200:
        print(f"Erro na API: {response.text}")
        return {"category": "Erro", "suggestion": "A API da IA não respondeu corretamente."}

    try:
        generated_text = response.json()[0]['generated_text']
        analysis_result = json.loads(generated_text)
        
        # Garantir que as chaves esperadas existam
        if 'category' not in analysis_result or 'suggestion' not in analysis_result:
            raise KeyError("A resposta da IA não contém as chaves 'categoria' ou 'sugestao'.")

        return analysis_result
    except (json.JSONDecodeError, KeyError, IndexError) as e:
        print(f"Erro ao processar a resposta da IA: {e}")
        print(f"Resposta recebida: {response.text}")
        return {"category": "Erro", "suggestion": "A resposta da IA está em um formato inválido."}


# --- As rotas Flask permanecem as mesmas ---

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/classify', methods=['POST'])
def classify_email_api():
    data = request.get_json()
    if not data or 'email_text' not in data:
        return jsonify({'error': 'O texto do email não foi fornecido.'}), 400
    
    email_text = data['email_text']
    result = get_ai_analysis(email_text)
    return jsonify(result)

@app.route('/upload', methods=['POST'])
def upload_and_classify_file():
    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo enviado.'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado.'}), 400
    
    extracted_text = ""
    try:
        if file.filename.endswith('.pdf'):
            doc = fitz.open(stream=file.read(), filetype="pdf")
            for page in doc:
                extracted_text += page.get_text()
            doc.close()
        elif file.filename.endswith('.txt'):
            extracted_text = file.read().decode('utf-8')
        else:
            return jsonify({'error': 'Formato de arquivo não suportado.'}), 400
            
        result = get_ai_analysis(extracted_text)
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': f'Falha ao processar o arquivo: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)