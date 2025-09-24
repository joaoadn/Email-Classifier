# Classificador de Emails

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

## 📝 Descrição

Este projeto é uma aplicação web desenvolvida em Python com Flask que utiliza inteligência artificial para automatizar a análise e classificação de emails. A ferramenta é capaz de categorizar um email como "Produtivo" ou "Improdutivo" e sugerir uma resposta apropriada, otimizando o tempo da equipe e reduzindo o trabalho manual de gerenciamento da caixa de entrada.

## ✨ Features

- **Classificação com IA:** Utiliza a API da Hugging Face para analisar o conteúdo do email e determinar sua categoria.
- **Sugestão de Resposta:** Gera uma resposta automática e contextual com base no conteúdo e na categoria do email.
- **Interface Web Moderna:** Frontend elegante e responsivo com tema claro e escuro.
- **Suporte a Arquivos:** Permite a análise de arquivos `.txt` e `.pdf` anexados.
- **Design Minimalista:** Foco em uma experiência de usuário limpa e intuitiva.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS, JavaScript
- **IA:** Hugging Face Inference API (Modelo `google/flan-t5-large`)
- **Leitura de PDF:** PyMuPDF

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente:

1.  **Clone o repositório** (ou certifique-se de ter a pasta do projeto):
    ```bash
    # Exemplo: git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd nome-da-pasta-do-projeto
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    # Windows
    py -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Instale as dependências:**
    ```bash
    py -m pip install -r requirements.txt
    ```

4.  **Configure sua chave da API:**
    Crie uma conta no [Hugging Face](https://huggingface.co/) e obtenha um Access Token. Depois, defina-o como uma variável de ambiente:
    ```bash
    # Windows (Prompt de Comando)
    set HF_TOKEN=sua_chave_aqui
    ```

5.  **Execute a aplicação:**
    ```bash
    py app.py
    ```
    Acesse `http://127.0.0.1:5000` no seu navegador.

## 📂 Estrutura do Projeto
/
|-- app.py
|-- requirements.txt
|-- README.md
|-- /static
|   |-- style.css
|   |-- script.js
|-- /templates
|   |-- index.html


