import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("main-header")
export class MainHeader extends LitElement {

    static get styles() {
        // language=css
        return css`
            :host {
                height: 100vh;
                width: 100vw;
                display: grid;
            }

            div {
                width: 100vh;
                font-family: Manrope, serif;
                font-size: 45px;
            }

        `;
    }

    render() {
        // language=html
        return html`
            <div>
                RedFlag
            </div>
        `;
    }
}