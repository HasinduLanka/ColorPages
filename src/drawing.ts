export interface IDrawings {
    [key: string]: IDrawing;
}
export interface IDrawing {
    viewBox: string;
    preserveAspectRatio: string;
    gs: G[];
    strokeCount: number;
}

export interface G {
    transform: string;
    fill: Fill;
    stroke: Stroke;
    vectors: Vectors;
}

export enum Fill {
    White = "#ffffff",
    Black = "#000000",
}

export enum Stroke {
    None = "none",
}

export interface Vectors {
    path: Path[];
}

export interface Path {
    fill: Fill | string;
    stroke: Stroke;
    d: string;
}
