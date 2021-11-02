import { writable, readable } from "svelte/store";
import drawings from "./drawings";
import type { IDrawings } from "./drawing";

export let DrawingID = writable("");

export let Drawings = drawings as IDrawings;


export function GetRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}