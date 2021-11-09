
import Start from "./Start.svelte";
import ColorPage from "./ColorPage.svelte";
import { BindRoutes, RouteData, Routes } from "./HashRoutes";

let inited = false;

export default function ConfigRoutes() {

    if (inited) return;
    inited = true;

    Routes[""] = new RouteData(Start);
    Routes["colorpage"] = new RouteData(ColorPage);

    console.log("Routes configured");

    BindRoutes();
}
