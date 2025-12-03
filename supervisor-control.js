<script type="module">
  // Load LitElement from unpkg CDN
  import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.2?module';

  class ButtonWidget extends LitElement {
    static styles = css`
      .btn {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        color: white;
        border: none;
        background-color: var(--btn-color, #3498db);
        transition: background-color 0.2s;
      }
    `;

    static properties = {
      toggled: { type: Boolean }
    };

    constructor() {
      super();
      this.toggled = false;
    }

    toggleColor() {
      this.toggled = !this.toggled;
    }

    render() {
      const currentColor = this.toggled ? "#e74c3c" : "#3498db";
      return html`
        <button class="btn" style="background-color: ${currentColor}" @click=${this.toggleColor}>
          Press Me
        </button>
      `;
    }
  }

  // Register the custom element
  customElements.define('supervisor-control', ButtonWidget);
</script>
