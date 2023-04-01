import '@shoelace-style/shoelace/dist/themes/light.css';
import {setBasePath} from "@shoelace-style/shoelace";

import './main.css';
import {Router} from "@vaadin/router";
import {routes} from "./routing";

export const router = new Router(document.querySelector("#outlet"));

router.setRoutes(routes).then(r => {});

setBasePath('static/dist/shoelace');


