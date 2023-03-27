import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import '@shoelace-style/shoelace/dist/components/dialog/dialog';
import '@shoelace-style/shoelace/dist/components/button/button';

@customElement("main-layout")
export class MainLayout extends LitElement{

    static get styles() {
        // language=css
        return css`
            :host {
                display: grid;
                grid-template-rows: 0 0 1fr;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <sl-button>ADD</sl-button>
          `;
    }
}