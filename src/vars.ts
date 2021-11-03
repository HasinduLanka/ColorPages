import { writable, readable, Writable } from "svelte/store";
import drawings from "./drawings";
import type { IDrawings, IDrawing } from "./drawing";

// Current drawings
export let CDrawingID = writable("");
export let CDrawing: Writable<IDrawing> = writable();

export let Drawings = drawings as IDrawings;

export function SaveDrawing(id: string, drawing: IDrawing) {
    let djson = JSON.stringify(drawing);
    localStorage.setItem("drw-" + id, djson);
}

export function DeleteDrawing(id: string) {
    localStorage.removeItem("drw-" + id);
}

export function LoadDrawing(id: string): IDrawing {
    let djson = localStorage.getItem("drw-" + id);
    if (djson) {
        let drawing: IDrawing = JSON.parse(djson);
        return drawing;
    }
    return null;
}

export function ListSavedDrawings(): string[] {
    let ids: string[] = [];
    for (var i in localStorage) {
        if (i.startsWith("drw-")) {
            let id = i.substr(4);
            ids.push(id);
        }
    }

    return ids;
}


