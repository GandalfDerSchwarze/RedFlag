import {Router} from "@vaadin/router";
import '@shoelace-style/shoelace/dist/themes/light.css';
import {setBasePath} from "@shoelace-style/shoelace";
import {routes} from "./routing";

export const router = new Router(document.querySelector("#outlet"));

router.setRoutes(routes).then(r => console.log(r));

setBasePath('static/dist/shoelace');
