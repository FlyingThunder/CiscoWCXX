(() => {
    customElements.define("supervisor-control", class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });

            // Create a container
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.gap = "10px";
            container.style.alignItems = "center";

            // Create the textbox
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter some text";
            input.style.padding = "8px";
            input.style.fontSize = "14px";
            input.style.flex = "1";

            // Create the button
            const button = document.createElement("button");
            button.textContent = "Send";
            button.style.padding = "10px 20px";
            button.style.fontSize = "16px";
            button.style.cursor = "pointer";
            button.style.backgroundColor = "#3498db";
            button.style.color = "white";
            button.style.border = "none";

            // Button click handler
            button.addEventListener("click", async () => {
                const payload = input.value;
                if (!payload) {
                    alert("Please enter some text first!");
                    return;
                }

                try {
                    // Replace this URL with your target endpoint
                    const url = "https://webhook.site/a51bc107-4f21-47fc-9fbd-c927b37f7b1f";
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ data: payload })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    alert("Data sent successfully!");
                } catch (err) {
                    console.error(err);
                    alert("Error sending data. Check console for details.");
                }
            });

            // Add textbox and button to container
            container.appendChild(input);
            container.appendChild(button);

            // Attach container to shadowRoot
            this.shadowRoot.appendChild(container);
        }
    });
})();
