import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import "./../../../assets/img/background-main-layout-new.jpg";

@customElement("chat-text-area")
export class ChatTextArea extends LitElement {

    static get styles() {
        // language=css
        return css`
            :host {
                height: 100%;
                width: 100%;
            }

            .testImage {
                background: url('/static/assets/background-main-layout-new.jpg');
            }
            
        `;
    }

    render() {
        // language=html
        return html`
            <div class="testImage" style="width: 100%; height: 100%;">
            </div>

            
            <img src="/static/assets/background-main-layout-new.jpg">
        `;
    }
}