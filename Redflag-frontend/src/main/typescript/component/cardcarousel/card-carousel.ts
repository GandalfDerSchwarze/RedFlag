import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {map} from "underscore";
import {ApplicationDto} from "../../features/main/model/application-card-model";


@customElement("card-carousel")
export class CardCarousel extends LitElement {

    @property()
    private applications: ApplicationDto[] = [
        {
            application: "Chat",
            imageAlt: "",
            imageSrc: "",
            description: "Simple Chat Tool",
            link: "chat"
        }
    ]

    static get styles() {
        // language=css
        return css`
            :host {
            }

            .flexContainer {
                display: flex;
                width: 100%;
                height: 100%;
            }

            .card {
                padding: 10px;
                width: 200px;
                height: 300px;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <div class="flexContainer">
                ${map(this.applications, (app) => {
                    return html`
                        <sl-card class="card">
                            <img class="image"
                                 slot="image"
                                 src="${app.imageSrc}"
                                 alt="${app.imageAlt}"
                            />
                            <b>${app.application}</b>
                            <div>${app.description}</div>
                            <div slot="footer">
                                <sl-button href="${app.link}" variant="primary">Open</sl-button>
                            </div>
                        </sl-card>
                    `
                })}
            </div>
        `;
    }
}