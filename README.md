# AI Email Classifier

A sleek, minimalist web application designed to classify emails and suggest appropriate responses using the power of Large Language Models via the Groq API. This tool helps streamline productivity by providing instant analysis and actionable suggestions.


## ✨ Key Features

- **AI-Powered Classification**: Instantly categorizes emails as "Productive" or "Unproductive" based on their content.
- **Automatic Response Suggestion**: Generates a concise, context-aware response suggestion for each analyzed email.
- **File Analysis**: Supports direct analysis of `.txt` and `.pdf` files, extracting the text for classification.
- **Minimalist UI**: A clean, dark-mode, single-page interface designed for focus and ease of use.
- **Fast & Efficient**: Powered by the high-speed Groq API with the Llama 3 model for near-instant results.

---

## 🚀 Tech Stack

- **Backend**: Python, Flask
- **AI Integration**: Groq API (Llama 3 70b)
- **Frontend**: HTML5, CSS3, JavaScript
- **Python Libraries**: `python-dotenv`, `PyMuPDF`, `groq`

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Create a virtual environment and install dependencies:**
    ```bash
    # For Windows
    py -m venv venv
    .\venv\Scripts\activate
    
    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # Install libraries
    pip install -r requirements.txt
    ```

3.  **Set up your API Key:**
    - Create a file named `.env` in the root directory.
    - Add your Groq API key to it:
      ```
      GROQ_API_KEY="your_api_key_here"
      ```

4.  **Run the application:**
    ```bash
    flask run
    ```
    The application will be available at `http://127.0.0.1:5000`.

---

## Usage

- **Text Input**: Paste the email content directly into the text area.
- **File Upload**: Click the `+` icon to upload a `.txt` or `.pdf` file.
- **Analyze**: Click the "Analisar" button to get the classification and response suggestion.
- **Copy**: Use the copy icon within the suggestion box to copy the text to your clipboard.
