import { writable, readable, Writable } from "svelte/store";
import drawings from "./drawings";
import type { IDrawings, IDrawing } from "./drawing";

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

export let SoundPaintSelect =
    "data:audio/mp3;base64,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"


export let SoundFillPaint =
    "data:audio/mp3;base64,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"