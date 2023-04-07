import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import "./../../../assets/img/background-main-layout-new.jpg";

@customElement("chat-text-area")
export class ChatTextArea extends LitElement {

    static get styles() {
        // language=css
        return css`
            :host {
                width: 100vw;
                height: 100vh;
            }

            .container {
                background-color: lightslategray;
                display: grid;
                position: absolute;
                grid-template-columns: 3fr auto;
                gap: 10px;
                padding: 15px;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }

            .textcontainer {
                position: absolute;
                left: 1.5rem;
                right: 1.5rem;
                bottom: 1.5rem;
                top: 0;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;
                background-color: dimgray;
            }

            .text {
                width: 100%;
                height: 100%;
                background-color: dimgray;
                border-bottom-right-radius: 25px;
                border-bottom-left-radius: 25px;
                display: grid;
                grid-template-rows: 1fr auto;
            }

            .sendBar {
                display: grid;
                grid-template-columns: 1fr auto;
            }

            .sendBar > sl-input {
                padding-left: 20px;
                padding-bottom: 15px;
            }

            .info {
                width: 100%;
                height: 100%;
                background-color: dimgray;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="container">
                <div class="text" style="">
                    <div class="history">
                        <lit-virtualizer></lit-virtualizer>
                    </div>
                    <div class="sendBar">
                        <sl-input placeholder="Input" size="medium" pill></sl-input>
                        <div style="margin-top: -4px;">
                            <sl-icon-button name="send" style="font-size: 33px; "></sl-icon-button>
                        </div>
                    </div>
                </div>
                <div class="info" style="width: 33vw" hidden="true">
                </div>
            </div>
        `;
    }
}