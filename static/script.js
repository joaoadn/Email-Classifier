document.addEventListener('DOMContentLoaded', () => {
    // Seletores de Elementos
    const fileInfo = document.getElementById('file-info');
    const themeToggle = document.getElementById('theme-toggle');
    const lightbulbOn = document.getElementById('lightbulb-on');
    const lightbulbOff = document.getElementById('lightbulb-off')
    const greetingElement = document.getElementById('dynamic-greeting');
    const classifyBtn = document.getElementById('classify-btn');
    const emailText = document.getElementById('email-text');
    const fileInput = document.getElementById('file-input');
    const fileNameSpan = document.getElementById('file-name');
    const clearFileBtn = document.getElementById('clear-file');
    const resultSection = document.getElementById('result-section');
    const resultContainer = document.getElementById('result-container');
    const categoryBadge = document.getElementById('category-badge');
    const suggestionP = document.getElementById('suggestion');
    const loader = document.getElementById('loader');
    const classifiedEmailText = document.getElementById('classified-email-text');
    const toggleTextBtn = document.getElementById('toggle-text-btn');

    if (fileInfo) {
        fileInfo.classList.add('hidden');
    }

    // --- LÓGICA DO TEMA ---
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            lightbulbOn.classList.add('hidden');
            lightbulbOff.classList.remove('hidden');
        } else {
            lightbulbOn.classList.remove('hidden');
            lightbulbOff.classList.add('hidden');
        }
    };
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userTheme) {
        applyTheme(userTheme);
    } else if (systemTheme) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- LÓGICA DE SAUDAÇÃO ---
    const hour = new Date().getHours();
    let greetingText = '';
    if (hour < 12) {
        greetingText = 'Bom dia';
    } else if (hour < 18) {
        greetingText = 'Boa tarde';
    } else {
        greetingText = 'Boa noite';
    }
    // AQUI ESTÁ A MUDANÇA: Saudação mais simples
    greetingElement.innerHTML = `<span class="gradient-text">${greetingText}</span><br>Qual email vamos analisar hoje?`;

    // --- LÓGICA DA APLICAÇÃO ---
    let attachedFile = null;

    emailText.addEventListener('input', () => {
        emailText.style.height = 'auto';
        emailText.style.height = (emailText.scrollHeight) + 'px';
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            attachedFile = fileInput.files[0];
            fileNameSpan.textContent = attachedFile.name;
            fileInfo.classList.remove('hidden');
            emailText.disabled = true;
            emailText.placeholder = 'Arquivo anexado. Remova-o para digitar.';
        }
    });

    clearFileBtn.addEventListener('click', () => {
        attachedFile = null;
        fileInput.value = '';
        fileInfo.classList.add('hidden');
        emailText.disabled = false;
        emailText.placeholder = 'Cole ou digite seu email';
        emailText.focus();
    });
    
    function displayResult(data, originalText) {
        loader.classList.add('hidden');
        categoryBadge.textContent = data.category;
        categoryBadge.className = data.category ? data.category.toLowerCase().trim() : 'erro';
        suggestionP.textContent = data.suggestion;
        classifiedEmailText.textContent = originalText;

        classifiedEmailText.classList.remove('truncated');
        toggleTextBtn.classList.add('hidden');
        if (classifiedEmailText.scrollHeight > 100) {
            classifiedEmailText.classList.add('truncated');
            toggleTextBtn.textContent = 'Ver mais...';
            toggleTextBtn.classList.remove('hidden');
        }

        resultContainer.classList.remove('hidden');
        setTimeout(() => {
            resultContainer.classList.add('visible');
        }, 10);
    }
    
    function displayError(message) {
        loader.classList.add('hidden');
        alert(message || 'Ocorreu um erro ao processar a solicitação.');
        resultSection.classList.add('hidden');
        resultContainer.classList.remove('visible');
    }

    toggleTextBtn.addEventListener('click', () => {
        const isTruncated = classifiedEmailText.classList.toggle('truncated');
        toggleTextBtn.textContent = isTruncated ? 'Ver mais...' : 'Ver menos';
    });

    classifyBtn.addEventListener('click', () => {
        resultSection.classList.remove('hidden');
        resultContainer.classList.remove('visible');
        resultContainer.classList.add('hidden');
        loader.classList.remove('hidden');

        const handleSuccess = (data, text) => {
            if (data.error) {
                displayError(data.error);
            } else {
                displayResult(data, text);
            }
        };

        if (attachedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const formData = new FormData();
                formData.append('file', attachedFile);
                fetch('/upload', { method: 'POST', body: formData })
                    .then(res => res.ok ? res.json() : Promise.reject(res))
                    .then(data => handleSuccess(data, text))
                    .catch(() => displayError());
            };
            reader.readAsText(attachedFile, 'UTF-8');
        } else {
            const text = emailText.value;
            if (!text.trim()) {
                displayError('Por favor, digite um texto ou anexe um arquivo.');
                return;
            }
            fetch('/classify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_text: text }),
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => handleSuccess(data, text))
            .catch(() => displayError());
        }
    });
});