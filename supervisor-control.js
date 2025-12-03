class PostWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create elements
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter text here';
        input.id = 'textInput';

        const button = document.createElement('button');
        button.textContent = 'Send';
        button.addEventListener('click', () => this.sendPost());

        // Style (optional)
        const style = document.createElement('style');
        style.textContent = `
            input {
                padding: 8px;
                font-size: 14px;
                width: 200px;
            }
            button {
                padding: 8px 12px;
                margin-left: 8px;
                font-size: 14px;
                cursor: pointer;
            }
        `;

        this.shadowRoot.append(style, input, button);
    }

    async sendPost() {
        const input = this.shadowRoot.getElementById('textInput');
        const payload = { data: input.value };
        const url = 'https://example.com/your-endpoint'; // <-- Replace with your URL

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            console.log('Response:', result);
        } catch (err) {
            console.error('POST request failed:', err);
        }
    }
}

customElements.define('post-widget', PostWidget);
