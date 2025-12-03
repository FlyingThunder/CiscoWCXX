(() => {
    customElements.define("supervisor-control", class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });

            //
            // --- Container Layout ---
            //
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.gap = "10px";
            container.style.alignItems = "center";
            container.style.padding = "10px";

            //
            // --- Text Input ---
            //
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter value";
            input.style.padding = "8px 10px";
            input.style.fontSize = "14px";
            input.style.width = "150px";

            // WxCC styling
            this.applyWxCCInputStyle(input);


            //
            // --- Dropdown Select ---
            //
            const select = document.createElement("select");
            select.style.padding = "8px 10px";
            select.style.fontSize = "14px";

            // WxCC styling
            this.applyWxCCInputStyle(select);

            // Display text -> internal value
            const options = [
                { label: "Value 1", value: "var_1" },
                { label: "Value 2", value: "var_2" },
                { label: "Value 3", value: "var_3" }
            ];

            options.forEach(opt => {
                const option = document.createElement("option");
                option.textContent = opt.label;
                option.value = opt.value;
                select.appendChild(option);
            });


            //
            // --- Send Button ---
            //
            const button = document.createElement("button");
            button.textContent = "Send";

            // WxCC button style
            button.style.padding = "10px 20px";
            button.style.fontSize = "16px";
            button.style.cursor = "pointer";
            button.style.backgroundColor = "#027aff";
            button.style.color = "white";
            button.style.border = "1px solid #027aff";
            button.style.borderRadius = "6px";
            button.style.fontWeight = "500";
            button.style.transition = "background-color 0.15s";

            // Hover effect (WxCC-style)
            button.addEventListener("mouseover", () => {
                button.style.backgroundColor = "#026be0";
            });
            button.addEventListener("mouseout", () => {
                button.style.backgroundColor = "#027aff";
            });


            //
            // --- Click Handler ---
            //
            button.addEventListener("click", async () => {
                const accessToken = this.getAttribute("access-token");

                const payload = {
                    text: input.value,
                    selectedOption: select.value,
                    accesstoken: accessToken
                };

                try {
                    const response = await fetch("https://hooks.uk.webexconnect.io/events/AY0SWDFC4S", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });

                    console.log("Response:", response.status);
                    alert("Data sent successfully!");
                } catch (err) {
                    console.error("Error sending request:", err);
                    alert("Failed to send data. Check console.");
                }
            });


            //
            // --- Assemble UI ---
            //
            container.appendChild(input);
            container.appendChild(select);
            container.appendChild(button);

            this.shadowRoot.appendChild(container);
        }

        //
        // --- Shared WxCC-style input/select decorator ---
        //
        applyWxCCInputStyle(el) {
            el.style.border = "1px solid #cfd6dd";
            el.style.borderRadius = "6px";
            el.style.background = "#ffffff";
            el.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.05)";
            el.style.outline = "none";
            el.style.height = "36px";

            el.addEventListener("focus", () => {
                el.style.border = "1px solid #027aff";
            });

            el.addEventListener("blur", () => {
                el.style.border = "1px solid #cfd6dd";
            });
        }
    });
})();
