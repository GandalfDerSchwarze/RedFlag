import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("main-header")
export class MainHeader extends LitElement {

    static get styles() {
        // language=css
        return css`
            :host {
                width: 100%;
                height: 100%;
            }

            .header {
                width: 100vw;
                font-family: Manrope, serif;
                font-size: 45px;
                text-align: center;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="header">
                RedFlag
            </div>
        `;
    }
}