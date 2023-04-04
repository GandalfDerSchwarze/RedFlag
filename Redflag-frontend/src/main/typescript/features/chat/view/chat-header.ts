import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("chat-header")
export class ChatHeader extends LitElement {

    static get styles() {
        // language=css
        return css`
            :host {
                height: 100%;
                width: 100%;
            }
            
            .header-box {
                width: 100%;
                height: 100%;
                border-bottom-left-radius: 80px;
                border-bottom-right-radius: 80px;
                background: aliceblue;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="header-box">
            </div>
        `;
    }
}