import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("page-not-found")
export class PageNotFound extends LitElement {

    static get styles(){
        return css`
            h1 {
              height: 90%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <h1>404 Page not found :(</h1>
            `;
    }
}