import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import '@shoelace-style/shoelace/dist/components/dialog/dialog';
import '@shoelace-style/shoelace/dist/components/button/button';

@customElement("test-button")
export class TestButton extends LitElement {

    static get styles() {
        // language=css
        return css`
            :host {
            }
        `;
    }

    render() {
        // language=html
        return html`
            <sl-button @click="${() => console.log("heyhoIclicked")}">TEST</sl-button>
        `;
    }
}