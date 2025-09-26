# AI Email Assistant

A minimalist, high-performance web application designed to accelerate email management. This tool leverages the Groq API with Llama 3 to instantly classify emails and generate concise response suggestions, streamlining communication workflows.

The project features a clean, focused, dark-mode UI with an energetic orange accent, reflecting a modern and efficient user experience.

## 🚀 Live Demo

This application is deployed and available to use for free on Vercel.

**[Click here to access the live demo!](https://email-classifier-case-autou.vercel.app/)**

## ✨ Key Features

-   **Instant Classification**: Categorizes emails into "Productive" (requiring action) or "Unproductive" (informational).
-   **AI-Powered Suggestions**: Generates ready-to-use response suggestions directly within the interface.
-   **File Upload Support**: Analyzes content from `.txt` and `.pdf` files.
-   **Minimalist Interface**: A distraction-free UI focused entirely on input and actionable output.
-   **High-Speed Performance**: Built with the Groq API to ensure responses are generated almost instantly.

## 🛠️ Tech Stack

-   **Backend**: Python, Flask
-   **AI Integration**: Groq API (Llama 3)
-   **Frontend**: HTML5, CSS3 (Flexbox), Vanilla JavaScript
-   **File Processing**: PyMuPDF

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/joaoadn/Email-Classifier.git](https://github.com/joaoadn/Email-Classifier.git)
    cd Email-Classifier
    ```

2.  **Create a Virtual Environment & Install Dependencies:**
    ```bash
    # Create and activate a virtual environment
    # On Windows:
    py -m venv venv
    .\venv\Scripts\activate

    # On macOS/Linux:
    python3 -m venv venv
    source venv/bin/activate
    
    # Install dependencies
    pip install -r requirements.txt
    ```

3.  **Set Up Environment Variables (Crucial Step):**
    -   In the project's root directory, create a new file named `.env`.
    -   Inside this file, add your Groq API key as follows:
        ```
        GROQ_API_KEY="your_secret_api_key_here"
        ```

4.  **Run the Application:**
    ```bash
    flask run
    ```
    Now, open `http://127.0.0.1:5000` in your browser.
