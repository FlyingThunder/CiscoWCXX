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
                    const url = "https://hooks.uk.webexconnect.io/events/AY0SWDFC4S";
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ data: payload })
                    });
                    
                    console.log(`Widget text: ${response.text}`);
                    console.log(`Widget status: ${response.status}`);
                    console.log(`Widget text: ${response}`);

                    alert("Data sent successfully!");
                } catch (err) {


                    console.error(err);


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
