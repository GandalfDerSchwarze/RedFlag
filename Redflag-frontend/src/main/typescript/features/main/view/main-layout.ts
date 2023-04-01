import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

import './main-header'

@customElement("main-layout")
export class MainLayout extends LitElement{

    static get styles() {
        // language=css
        return css`
            :host {
                height: 100vh;
                width: 100vw;
                display: grid;
            }
            
            .mainpage {
                height: 100vh;
                width: 100vw;
                background: darkslategray;
            }
            
        `;
    }

    render() {
        // language=html
        return html`
            <div class="mainpage">
                <main-header></main-header>
                <slot class="container"></slot>
                <main-footer></main-footer>
            </div>
          `;
    }
}