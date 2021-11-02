export interface IDrawings {
    [key: string]: Svgson;
}

export interface Svgson {
    name: string;
    type: Type;
    value: string;
    attributes: SvgsonAttributes;
    children: SvgsonChild[];
}

export interface SvgsonAttributes {
    version: string;
    xmlns: string;
    width: string;
    height: string;
    viewBox: string;
    preserveAspectRatio: string;
}

export interface SvgsonChild {
    name: string;
    type: Type;
    value: string;
    attributes: PurpleAttributes;
    children: ChildChild[];
}

export interface PurpleAttributes {
    transform?: string;
    fill?: Fill;
    stroke?: Stroke;
}

export enum Fill {
    Ffffff = "#ffffff",
    The000000 = "#000000",
}

export enum Stroke {
    None = "none",
}

export interface ChildChild {
    name: Name;
    type: Type;
    value: string;
    attributes: FluffyAttributes;
    children: any[];
}

export interface FluffyAttributes {
    fill?: Fill;
    stroke?: Stroke;
    d?: string;
}

export enum Name {
    Empty = "",
    Path = "path",
}

export enum Type {
    Element = "element",
    Text = "text",
}


