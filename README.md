# AI Email Assistant | A Case Study for AutoU

A minimalist, high-performance web application designed to accelerate email management. This tool leverages the Groq API with Llama 3 to instantly classify emails and generate concise response suggestions, streamlining communication workflows.

The project features a clean, focused, dark-mode UI with an energetic orange accent, reflecting a modern and efficient user experience.

![GIF of the application in use](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGNpd3Ftdmx6a25jZzB2eG5iNzhkNmJzbm5xZnh2eHRzMnhmbWM3eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/your-gif-id/giphy.gif)
*Recomendação: Grave um GIF rápido da tela (usando ferramentas como LICEcap ou GIPHY Capture) e substitua o link acima. Isso torna o README extremamente profissional.*

---

## ✨ Key Features

- **Instant Classification**: Categorizes emails as "Productive" (requiring action) or "Unproductive" (informational).
- **AI-Powered Suggestions**: Generates ready-to-use response suggestions directly within the interface.
- **File Upload**: Supports analysis of `.txt` and `.pdf` files by simply attaching them.
- **Streamlined UX**: After analysis, the uploaded file is automatically cleared, preparing the app for the next task.
- **Minimalist Interface**: The UI is designed to be distraction-free, focusing solely on the input and the actionable output.
- **High-Speed Performance**: Built with the Groq API to ensure responses are generated almost instantly.

---

## 🚀 Tech Stack

- **Backend**: Python, Flask
- **AI Integration**: Groq API (Llama 3)
- **Frontend**: HTML5, CSS3 (Flexbox), Vanilla JavaScript
- **File Processing**: PyMuPDF

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/joaoadn/Email-Classifier.git](https://github.com/joaoadn/Email-Classifier.git)
    cd Email-Classifier
    ```

2.  **Create a Virtual Environment & Install Dependencies:**
    ```bash
    # For Windows:
    py -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux:
    python3 -m venv venv
    source venv/bin/activate
    
    # Install from the clean requirements file:
    pip install -r requirements.txt
    ```

3.  **Set Up Environment Variables:**
    - Create a `.env` file in the root directory.
    - Add your Groq API key:
      ```
      GROQ_API_KEY="your_api_key_here"
      ```

4.  **Run the Application:**
    ```bash
    flask run
    ```
    Open `http://127.0.0.1:5000` in your browser.
