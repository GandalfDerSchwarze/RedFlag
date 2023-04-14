import {css, html, LitElement} from "lit";
import {customElement, state} from "lit/decorators.js";
// @ts-ignore
import FullBackgroundImage from '../../../assets/img/background-main-layout-new.jpg';

@customElement("main-layout-new")
export class MainLayoutNew extends LitElement {
    @state()
    leftBackgroundImage = "";
    rightBackgroundImage = "";

    async connectedCallback(){
        super.connectedCallback();

        const [left, right] = await Promise.all([
            this.editImage(FullBackgroundImage, 0, 0, 50, 100),
            this.editImage(FullBackgroundImage, 50, 0, 50, 100)
        ]);

        this.leftBackgroundImage = left;
        this.rightBackgroundImage = right;
    }

    static get styles() {
        //language=css
        // @ts-ignore
        return css`
            .grid-container {
                font-family: Manrope, serif;
                
                display: grid;
                grid-template-columns: 1fr 1fr;
                height: 100vh;
            }

            .left {
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                background-clip: text;
                color: transparent;
            }

            .right {
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                color: black;
            }
        `;
    }

    render() {
        //language=html
        return html`
            <div class="grid-container">
                <div class="left" style="background-image: url('${this.leftBackgroundImage}')">
                    Red Flag
                </div>

                <div class="right" style="background-image: url('${this.rightBackgroundImage}')">
                    Items
                </div>
            </div>
        `;
    }

    private editImage(imageSrc: string, startXPercent: number, startYPercent: number, newWidthPercent: number, newHeightPercent: number) {
        const canvas = document.createElement("canvas")!;
        const ctx = canvas.getContext("2d")!;
        const image = new Image();

        return new Promise<string>((resolve) => {
            const onload = () => {
                let newWidth: number = image.width * newWidthPercent / 100.0;
                let newHeight: number = image.height * newHeightPercent / 100.0;
                let startWidth: number = image.width * startXPercent / 100.0;
                let startHeight: number = image.height * startYPercent / 100.0;

                newWidth = Math.floor(newWidth);
                newHeight = Math.floor(newHeight);
                startWidth = Math.floor(startWidth);
                startHeight = Math.floor(startHeight);

                //console.log("[resizeImage]: resize - newWidth, newHeight", newWidth, newHeight);
                //console.log("[resizeImage]: start - startWidth, startHeight", startWidth, startHeight);

                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(image, startWidth, startHeight, newWidth, newHeight, 0, 0, newWidth, newHeight);
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