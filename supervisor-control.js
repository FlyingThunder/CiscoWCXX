(() => {
    customElements.define("supervisor-control", class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });

            const button = document.createElement("button");
            button.textContent = "Press Me";
            button.style.padding = "10px 20px";
            button.style.fontSize = "16px";
            button.style.cursor = "pointer";
            button.style.backgroundColor = "#3498db";
            button.style.color = "white";
            button.style.border = "none";

            let toggled = false;
            button.addEventListener("click", () => {
                toggled = !toggled;
                button.style.backgroundColor = toggled ? "#e74c3c" : "#3498db";
            });

            this.shadowRoot.appendChild(button);
        }
    });
})();
