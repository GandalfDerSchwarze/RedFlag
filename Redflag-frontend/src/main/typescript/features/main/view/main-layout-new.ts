import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("main-layout-new")
export class MainLayoutNew extends LitElement {
    static get styles() {
        //language=css
        return css`
            .grid-container {
                display: grid;
                grid-template-columns: 1fr 1fr;

                height: 100vh;

                background-image: url('/static/assets/background-main-layout-new.jpg');
                width: 67%;

                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }

            .left {
                background-clip: text;
                color: transparent;
            }

            .right {
                color: black;
            }
        `;
    }

    render() {
        //language=html
        return html`
            <div class="grid-container">
                <div class="left">
                    Red Flag
                </div>

                <div class="right" style="font-family: Manrope, serif;">
                    Items
                </div>
            </div>
        `;
    }
}