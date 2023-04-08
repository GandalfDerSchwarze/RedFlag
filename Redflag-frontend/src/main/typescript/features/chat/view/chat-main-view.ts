import {css, html} from "lit";
import {customElement, state} from "lit/decorators.js";

import "./chat-text-area";
import "./chat-header"
import {RootState, store} from "../../../store";
import {generateContacts, generateTempMessages, selectContacts, selectMessages} from "../slice/chat-slice";
import {ConnectedLitElement} from "../../../ConnectedLitElement";
import {Contact} from "../model/contact";


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

    @state()
    private messages?: Message[];

    @state()
    private contacts?: Contact[];


    connectedCallback() {
        super.connectedCallback();
        store.dispatch(generateTempMessages());
        store.dispatch(generateContacts());
    }

    stateChanged(state: RootState) {
        this.messages = selectMessages(state);
        this.contacts = selectContacts(state);
    }

    render() {
        // language=html
        return html`
            <div class="chat-main-layout">
                <chat-header
                        .contacts="${this.contacts}"
                        class="chat-header">
                </chat-header>
                <chat-text-area
                        .contact="${this.contacts![0]}"
                        .messages="${this.messages}"
                        class="chat-text">
                </chat-text-area>
            </div>
        `;
    }
}