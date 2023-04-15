import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

import './main-header'
import '../../../component/cardcarousel/card-carousel'

@customElement("main-layout-old")
export class MainLayoutOld extends LitElement{

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
                display: grid;
                grid-template-rows: 62px 1fr 62px;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="mainpage">
                <main-header></main-header>
                <card-carousel></card-carousel>
                <main-footer></main-footer>
            </div>
          `;
    }
}