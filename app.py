import os
from dotenv import load_dotenv
import json
from flask import Flask, request, jsonify, render_template
import fitz
from groq import Groq

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# --- Configuração da API da Groq ---
client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
)
MODELO = "llama-3.3-70b-versatile"

app = Flask(__name__)

def get_ai_analysis(text):
    """
    Função que usa o client da Groq para chamar a API Llama 3.
    """
    messages = [
    {
        "role": "system",
        "content": """Você é um assistente de produtividade altamente eficiente. Sua única tarefa é analisar o email de um usuário e retornar APENAS e TÃO SOMENTE um objeto JSON.

O objeto JSON deve ter EXATAMENTE as seguintes chaves:
1. "category": Deve ser "Produtivo" se o email contiver uma pergunta, um pedido ou um problema que exija uma ação. Caso contrário (agradecimentos, avisos, spam), deve ser "Improdutivo".
2. "suggestion": Deve ser uma sugestão de resposta curta, útil e profissional em português.

Não inclua nenhuma explicação ou texto fora do objeto JSON.

Exemplo de como responder:
- Para um email pedindo um relatório, a resposta JSON seria: {"category": "Produtivo", "suggestion": "Claro, estou verificando o relatório solicitado e retorno em breve."}
- Para um email de agradecimento, a resposta JSON seria: {"category": "Improdutivo", "suggestion": "De nada! Fico feliz em ajudar."}
"""
    },
    {
        "role": "user",
        "content": f"Analise o seguinte email e retorne o objeto JSON: ---{text}---"
    }
]
    
    try:
        chat_completion = client.chat.completions.create(
            messages=messages,
            model=MODELO,
            temperature=0.2,
            max_tokens=150,
            response_format={"type": "json_object"},
        )
        
        generated_text = chat_completion.choices[0].message.content
        analysis_result = json.loads(generated_text)
        
        return analysis_result
        
    except Exception as e:
        print(f"Erro ao processar resposta da IA da Groq: {e}")
        return {"category": "Erro", "suggestion": "A resposta da IA da Groq não pôde ser processada."}

# --- Rotas Flask ---
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/classify', methods=['POST'])
def classify_email_api():
    data = request.get_json()
    email_text = data.get('email_text', '')
    if not email_text:
        return jsonify({'error': 'O texto do email não foi fornecido.'}), 400
    
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
        if file.filename.lower().endswith('.pdf'):
            doc = fitz.open(stream=file.read(), filetype="pdf")
            for page in doc:
                extracted_text += page.get_text()
            doc.close()
        elif file.filename.lower().endswith('.txt'):
            extracted_text = file.read().decode('utf-8')
        else:
            return jsonify({'error': 'Formato de arquivo não suportado (apenas .txt e .pdf).'}), 400
        
        
        result = get_ai_analysis(extracted_text)

        
        result['analyzed_text'] = extracted_text
        
        return jsonify(result)

    except Exception as e:
        print(f"Erro ao processar o arquivo: {e}")
        return jsonify({'error': f'Falha ao processar o arquivo: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)