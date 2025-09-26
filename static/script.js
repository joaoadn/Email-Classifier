document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('dynamic-greeting');
    const classifyBtn = document.getElementById('classify-btn');
    const emailText = document.getElementById('email-text');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const fileNameSpan = document.getElementById('file-name');
    const clearFileBtn = document.getElementById('clear-file');
    const resultSection = document.getElementById('result-section');
    const resultContainer = document.getElementById('result-container');
    const categoryBadge = document.getElementById('category-badge');
    const suggestionP = document.getElementById('suggestion');
    const loader = document.getElementById('loader');
    const copyBtn = document.getElementById('copy-btn');

    const hour = new Date().getHours();
    let greetingText = '';
    if (hour < 12) { 
        greetingText = 'Bom dia'; 
    } else if (hour < 18) { 
        greetingText = 'Boa tarde'; 
    } else { 
        greetingText = 'Boa noite'; 
    }
    greetingElement.innerHTML = `<span class="gradient-text">${greetingText}.</span>É só colar o texto ou anexar o arquivo para começar.`;

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
            emailText.value = '';
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
    
    function displayResult(data) {
        loader.classList.add('hidden');
        categoryBadge.textContent = data.category;
        categoryBadge.className = data.category ? data.category.toLowerCase().trim() : 'erro';
        
        const suggestionText = data.suggestion || '';
        const textNode = document.createTextNode(suggestionText);
        suggestionP.innerHTML = '';
        suggestionP.appendChild(textNode);
        suggestionP.appendChild(copyBtn);

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

    classifyBtn.addEventListener('click', () => {
        resultSection.classList.remove('hidden');
        resultContainer.classList.remove('visible');
        resultContainer.classList.add('hidden');
        loader.classList.remove('hidden');

        const handleSuccess = (data) => {
            if (data.error) {
                displayError(data.error);
            } else {
                displayResult(data);
            }
        };

        if (attachedFile) {
            const formData = new FormData();
            formData.append('file', attachedFile);
            fetch('/upload', { method: 'POST', body: formData })
                .then(res => res.ok ? res.json() : Promise.reject(res))
                .then(data => handleSuccess(data))
                .catch(() => displayError());
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
            .then(data => handleSuccess(data))
            .catch(() => displayError());
        }
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = suggestionP.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Sugestão copiada para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
            alert('Não foi possível copiar o texto.');
        });
    });
});