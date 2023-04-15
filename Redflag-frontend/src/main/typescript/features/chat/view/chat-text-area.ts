import {css, html, LitElement} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import "../../../assets/img/background-main-layout.jpg";
import '@lit-labs/virtualizer'
import {Contact} from "../model/contact";
import {flow} from '@lit-labs/virtualizer/layouts/flow.js'
import {LitVirtualizer} from "@lit-labs/virtualizer";

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
                padding: 15px;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: clip;
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
                grid-template-rows: 1fr auto 0;
                position: relative;
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

            .contactInfoButton > sl-icon-button {
                margin: unset;
                padding: unset;
            }

            .contactInfoButton > sl-icon-button::part(base) {
                margin: unset;
                padding: unset;
            }

            lit-virtualizer {
                display: block;
                padding-left: 7px;
                padding-right: 7px;
                position: relative;
                contain: strict;
                overflow: auto;
                grid-row: 2;
            }

            .history {
                display: grid;
                grid-template-rows: 1fr auto;
                max-height: 100%;
            }

            .message-element {
                width: 98%;
            }

            .right {
                text-align: right;
            }

            ::-webkit-scrollbar {
                width: 8px;
            }

            ::-webkit-scrollbar-track {
                background-color: dimgray;
            }

            ::-webkit-scrollbar-thumb {
                background-color: #7b7b7b;
                border-radius: 20px;
                border: 3px solid #7b7b7b;
            }

            :host {
                scrollbar-color: #7b7b7b dimgray;   
            }


        `;
    }

    @state()
    private showContactInfo: boolean = false;

    @property()
    contact?: Contact;

    @property()
    messages: Message[] = [];

    @state()
    private historyElement?: HTMLDivElement | null;

    @state()
    private virtualizer?: LitVirtualizer | null;

    @state()
    private maxVirtHeight: number = 150;

    //temp vars for further changes
    private accountName = "leon"

    protected firstUpdated() {
        this.historyElement = this.renderRoot.querySelector('#history');
        this.virtualizer = this.renderRoot.querySelector('#virtualizer');
        if (this.historyElement) {
            this.maxVirtHeight = this.historyElement.getBoundingClientRect().height
            console.log(this.maxVirtHeight)
        }
    }

    protected updated() {
        if (this.virtualizer) {
            if (this.virtualizer.element(this.messages.length - 1)) {
                this.virtualizer.element(this.messages.length - 1)?.scrollIntoView({});
            }
        }

    }

    render() {
        // language=html
        return html`
            <div class="container">
                <div class="text" style="">
                    <div id="history" class="history">
                        <lit-virtualizer
                                id="virtualizer"
                                style="height: ${this.maxVirtHeight - 20}px"
                                scroller
                                .layout=${flow({
                                    direction: 'vertical'
                                })}
                                .items=${this.messages}
                                .renderItem=${(m: Message, index: number) => {
                                    if (index === 0) {
                                        return html`
                                            <div style="height: ${this.maxVirtHeight - 20}px; width: 98%">
                                                boilerplate for cool start image in the end
                                                <br>
                                                <br>
                                                <br>
                                                <br>
                                                boilerplate for cool start image in the end
                                            </div>
                                        `
                                    }
                                    return html`
                                        <div id="messageElement"
                                             class="message-element ${this.accountName === m.sender ? "left" : "right"}"
                                             style="height: 20px">
                                            ${m.content}
                                        </div>
                                    `
                                }}>
                        </lit-virtualizer>
                    </div>
                    <div class="sendBar">
                        <sl-input placeholder="Input" size="medium" pill></sl-input>
                        <div style="margin-top: -4px;">
                            <sl-icon-button @click="${() => console.log(this.virtualizer?.items)}" name="send"
                                            style="font-size: 33px; "></sl-icon-button>
                        </div>
                    </div>
                    <div class="contactInfoButton"
                         style="position:absolute; top: 50%; right: -1.8rem; font-size: 2.5rem">
                        ${!this.showContactInfo ?
                                html`
                                    <sl-icon-button
                                            @click="${() => this.showContactInfo = true}"
                                            name="chevron-compact-left">
                                    </sl-icon-button>`
                                :
                                html`
                                    <sl-icon-button
                                            @click="${() => this.showContactInfo = false}"
                                            name="chevron-compact-right">
                                    </sl-icon-button>
                                `}

                    </div>
                </div>
                <div class="info" style="width: 33vw; margin-left: 18px" ?hidden="${!this.showContactInfo}">
                </div>
            </div>
        `;
    }
}