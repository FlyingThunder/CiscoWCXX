(() => {
    customElements.define("supervisor-control", class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });

            // Container for styling
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.gap = "10px";
            container.style.alignItems = "center";

            // Text input
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter value";
            input.style.padding = "8px";
            input.style.fontSize = "14px";
            input.style.width = "150px";

            // Dropdown select
            const select = document.createElement("select");
            select.style.padding = "8px";
            select.style.fontSize = "14px";

            // Add options
            ["desc1", "desc2", "desc3"].forEach(optText => {
                const option = document.createElement("option");
                option.value = optText;
                option.textContent = optText;
                select.appendChild(option);
            });

            // Button
            const button = document.createElement("button");
            button.textContent = "Send";
            button.style.padding = "10px 20px";
            button.style.fontSize = "16px";
            button.style.cursor = "pointer";
            button.style.backgroundColor = "#3498db";
            button.style.color = "white";
            button.style.border = "none";

            button.addEventListener("click", async () => {
                const accessToken = this.getAttribute("access-token");
                const payload = {
                    text: input.value,
                    selectedOption: select.value,
                    accesstoken: accessToken,
                };

                try {
                    const response = await fetch("https://hooks.uk.webexconnect.io/events/AY0SWDFC4S", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
                    console.log("Response:", response.status);
                } catch (err) {
                    console.error("Error sending request:", err);
                }
            });

            container.appendChild(input);
            container.appendChild(select);
            container.appendChild(button);

            this.shadowRoot.appendChild(container);
        }
    });
})();
