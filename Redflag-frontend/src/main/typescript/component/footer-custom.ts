import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("footer-custom")
export class FooterCustom extends LitElement {
    static get styles() {
        return css`
          .footer {
            font-size: 200%;

            position: fixed;
            left: 1%;
            bottom: 1%;

            border: none;
            cursor: pointer;
            background-color: transparent;
          }

          .footer:hover {
            transform: scale(1.2);
          }
        `;
    }

    render() {
        return html`
            <button class="footer" @click="${this.about}">
                🚩
            </button>
        `;
    }

    about(){
        //Info about RedFlag :)
        console.log("RedFlag is AWSOME");
        alert("RedFlag is AWSOME")
    }
}