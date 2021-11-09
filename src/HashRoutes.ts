import { writable, Writable } from "svelte/store";

export class RouteData {
    Component: any;
    PropertyKeys?: string[];

    constructor(component: any, propertyKeys?: string[]) {
        this.Component = component;
        this.PropertyKeys = propertyKeys;
    }
}

export interface Properties {
    [key: string]: any;
}
export interface RouteDic {
    [key: string]: RouteData;
}

// Changing the Route will change the hash of url and trigger the route change.
// Change RouteProperties before changing the route if you want to change the route properties.
export let Route: Writable<string> = writable("-");

// Changing RouteProprerties won't change the URL hash immediately, but only after the next change to Route
export let RouteProperties: Writable<Properties> = writable({});

export let Routes: RouteDic = {};

export let RoutedComponent: Writable<any> = writable();

let _routeProprerties = {};
let _route = "";

Route.subscribe((newroute) => {

    _route = newroute;
    if (newroute === '-') {
        return;
    }

    let newHash = MakeURLHash();

    let windowhash = WindowHash();

    if (windowhash !== newHash) {
        window.location.hash = newHash;
    }

    let routedata = Routes[_route];

    if (routedata) {
        let component = routedata.Component;
        let propertykeys = routedata.PropertyKeys;

        let properties = {};
        if (propertykeys) {
            propertykeys.forEach((key) => {
                properties[key] = _routeProprerties[key];
            });
        }

        RoutedComponent.set(component);
        RouteProperties.set(properties);

        console.log("Routed to '" + _route + "'");
    } else {
        RoutedComponent.set(null);
        RouteProperties.set({});

        console.error("Route data for '" + _route + "' not found!");
    }

});

RouteProperties.subscribe((props) => {
    _routeProprerties = props;
});

function MakeURLHash(): string {
    return _route + ":" + encodeURIComponent(JSON.stringify(_routeProprerties));
}

function WindowHash() {
    let windowhash = window.location.hash;
    if (windowhash.charAt(0) == "#") {
        windowhash = windowhash.substr(1);
    }
    return windowhash;
}

function WindowLocationChanged() {
    let windowhash = WindowHash();

    if (windowhash !== MakeURLHash()) {

        const hashspl = windowhash.split(":", 2);
        let route = hashspl[0];
        let properties = hashspl[1];

        if (properties) {
            try {
                RouteProperties.set(
                    JSON.parse(decodeURIComponent(properties))
                );
            } catch (error) {
                RouteProperties.set({});
            }
        } else {
            RouteProperties.set({});
        }

        console.log("Window navigated to '" + route + "' with properties ", _routeProprerties);

        Route.set("-");
        Route.set(route);

    }
}


export function BindRoutes() {

    window.addEventListener("hashchange", () => {
        WindowLocationChanged();
    });

    window.addEventListener("load", () => {
        WindowLocationChanged();
    });

}


