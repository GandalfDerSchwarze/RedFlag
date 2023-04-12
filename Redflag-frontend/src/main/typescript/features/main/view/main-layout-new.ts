import {css, html, LitElement} from "lit";
import {customElement, state} from "lit/decorators.js";
// @ts-ignore
import CustomImage from '../../../assets/img/background-main-layout-new.jpg';


@customElement("main-layout-new")
export class MainLayoutNew extends LitElement {
    static get styles() {
        //language=css
        return css`
            .grid-container {
                display: grid;
                grid-template-columns: 1fr 1fr;

                height: 100vh;

                background-image: url('/static/assets/background-main-layout-new.jpg');
                width: 67%;

                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }

            .left {
                background-clip: text;
                color: transparent;
            }

            .right {
                color: black;
            }
        `;
    }

    private imageElement: HTMLImageElement = new Image();

    @state()
    private urlLeftSide: string = "";

    async connectedCallback() {
        super.connectedCallback();
        this.imageElement = new Image()
        this.imageElement.src = CustomImage

        //this.urlRightSide = this.editImage(Image3, 0, 0, 1000, 1000)

        this.urlLeftSide = await this.editImage(CustomImage, 100, 500, 500, 500);

    }


    render() {
        //language=html
        return html`
            <div class="grid-container">
                <div class="left">
                    Red Flag
                </div>

                <div class="right" style="font-family: Manrope, serif;">
                    Items
                </div>
            </div>

            <div style="background-image: url('${this.urlLeftSide}'); height: 500px; width: 500px">

            </div>
        `;
    }


    private editImage(imageSrc: string, sx: number, sy: number, sw: number, sh: number) {

        const canvas = document.createElement("canvas")!;
        const ctx = canvas.getContext("2d")!;

        const image = new Image();


        return new Promise<string>((resolve) => {
            const onload = () => {
                let width: number = 0;
                let height: number = 0;

                if (sw && sh) {
                    width = sw;
                    height = sh;
                } else if (sw) {
                    width = sw;
                    height = image.height * (sw / image.width);
                } else if (sh) {
                    width = image.width * (sh / image.height);
                    height = sh;
                }

                width = Math.floor(width);
                height = Math.floor(height);

                console.log("[resizeImage]: resize - width, height", width, height);

                canvas.width = width;
                canvas.height = height;
                //ctx.drawImage(image, 0, 0, width, height);
                ctx.drawImage(image, sx, sy, width, height, 0, 0, width, height);
                //this.test2.src = canvas.toDataURL();
                resolve(canvas.toDataURL());
            };

            const onerror = () => {
                return;
            };


            image.onload = onload;
            image.onerror = onerror;
            image.src = imageSrc;
        })
    }

}