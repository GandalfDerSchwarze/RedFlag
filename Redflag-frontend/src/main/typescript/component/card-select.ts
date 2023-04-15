import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
// @ts-ignore
import LogoChat from '../assets/img/logo-chat.jpg';

@customElement("card-select")
export class CardSelect extends LitElement {
    @property()
    private application = "Chat";
    private version = "V0.0";
    private category = "Useful Stuff";
    private addition = "by RedFlag";
    private description = "Description\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo dolores et ea rebum.\nStet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\nLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo dolores et ea rebum.\nStet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    private link = "chat";

    static get styles(){
        return css`
          .card {
            width: 240px;
            height: 100px;
            cursor: pointer;
            margin: 24px auto;
            border-radius: 16px 16px 0 0;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.10), 0 0 4px rgba(0, 0, 0, 0.23);
            box-sizing: border-box;
            overflow: hidden;
            transition: 0.8s;
          }

          .card-image {
            background-color: #24292e;
            position: relative;
            border-radius: 16px 16px 0 0;
          }

          .card-image img {
            width: 240px;
            height: auto;
            transition: 0.8s;
          }

          .card-image .version {
            font-size: 10px;
            font-weight: bold;
            color: white;
            background-color: rgba(51, 51, 51, 0.4);
            width: 30px;
            height: 30px;
            border-radius: 100%;
            line-height: 25px;
            position: absolute;
            top: 10px;
            right: 10px;
            text-align: center;
          }

          .card-content-category {
            font-size: 10px;
            font-weight: bold;
            color: white;
            background-color: rgba(51, 51, 51, 0.4);
            padding: 6px 10px 6px 10px;
            text-align: center;
            position: absolute;
            top: 95px;
            transition: 0.8s;
          }

          .card-content-box {
            width: 200px;
            height: 70px;
            overflow: hidden;
            background-color: white;
            border-radius: 0 0 16px 16px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
            position: absolute;
            top: 120px;
            padding: 10px 20px 10px 20px;
            transition: 0.7s;
          }

          .card-content-box h1 {
            margin: 0;
            font-weight: 900;
            font-size: 25px;
          }

          .card-content-box h2 {
            color: coral;
            font-weight: 600;
            font-size: 15px;
            margin-top: 4px;
            margin-bottom: 0;
          }

          .card-content-box p {
            color: grey;
            font-size: 16px;
            text-align: justify;
          }

          .card-content-box .card-content-hidden {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
          }

          .card:hover {
            transition: 0.7s;
            height: 120px;
          }

          .card:hover img {
            transform: scale(1.2);
            opacity: 0.7;
          }

          .card:hover .card-content-box {
            transform: translateY(-35px);
            -moz-animation: slide 0.7s ease 0.2s forwards;
            -webkit-animation: slide 0.7s ease 0.2s forwards;
            -o-animation: slide 0.7s ease 0.2s forwards;
            -ms-animation: slide 0.7s ease 0.2s forwards;
            animation: slide 0.7s ease 0.2s forwards;
          }

          .card:hover .card-content-category {
            transform: translateY(-35px);
          }

          .card:not(:hover) .hidden {
            height: 120px;
            opacity: 0;
            animation: fade-out 0.5s;
          }

          .card:hover .hidden {
            opacity: 1;
            color: grey;
            animation: fade-in 1.5s;
          }

          /* Safari and Chrome */
          @-webkit-keyframes slide {
            from {
              height: 120px;
            }
            to {
              height: 250px;
            }
          }

          /* Firefox */
          @-moz-keyframes slide {
            from {
              height: 120px;
            }
            to {
              height: 250px;
            }
          }

          /* Opera */
          @-o-keyframes slide {
            from {
              height: 120px;
            }
            to {
              height: 250px;
            }
          }

          /* IE10 */
          @-ms-keyframes slide {
            from {
              height: 120px;
            }
            to {
              height: 250px;
            }
          }

          @keyframes slide {
            from {
              height: 120px;
            }
            to {
              height: 250px;
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fade-out {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `;
    }

    render(){
        return html`
            <div class="card" onclick="location.href='${this.link}'">
                <div class="card-image">
                    <img src=${LogoChat} alt="Pictogramm of ${this.application}"/>
                    <div class="version">${this.version}</div>
                </div>
                <div class="card-content">
                    <div class="card-content-category">${this.category}</div>

                    <div class="card-content-box">
                        <h1>${this.application}</h1>
                        <h2>${this.addition}</h2>
                        <p class="card-content-hidden hidden">${this.description}</p>
                    </div>
                </div>
            </div>
        `;
    }
}