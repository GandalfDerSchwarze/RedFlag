import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("main-layout-new")
export class MainLayoutNew extends LitElement{

    static get styles(){
        //language=css
        return css`
            .grid-container{
                display: grid;
                grid-template-columns: 1fr 1fr;

                height: 100vh;

                background-image: url('https://images.pexels.com/photos/92664/pexels-photo-92664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }

            .left{
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .right{
                color: black;
            }
        `;
    }
    protected render(): unknown {
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
        `;
    }
}