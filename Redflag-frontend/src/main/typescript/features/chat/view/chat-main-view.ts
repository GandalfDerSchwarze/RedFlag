import {css, html} from "lit";
import {customElement} from "lit/decorators.js";

import "./chat-text-area";
import "./chat-header"
import {ConnectedLitElement} from "../../../ConnectedLitElement";
import {RootState} from "../../../store";
import {generateTempMessages, selectMessages} from "../slice/chat-slice";

@customElement("chat-main-view")
export class ChatMainView extends ConnectedLitElement {

    static get styles() {
        // language=css
        return css`
            :host {
                height: 100vh;
                width: 100vw;
                display: grid;
            }

            .chat-main-layout {

            }

            .chat-header {
                position: absolute;
                width: 100vw;
                height: 50px;
                z-index: 2;
            }

            .chat-text {
                position: absolute;
                width: 100vw;
                height: 100vh;
                z-index: 1;
            }
        `;
    }

    connectedCallback() {
        generateTempMessages();
    }

    stateChanged(state: RootState) {
        selectMessages(state);
    }

    render() {
        // language=html
        return html`
            <div class="chat-main-layout">
                <chat-header class="chat-header"></chat-header>
                <chat-text-area class="chat-text"></chat-text-area>
            </div>
        `;
    }
}