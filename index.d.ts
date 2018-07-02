
export function parse(s:string):transform[];

export { Transform } from "./src/parser";

export function render(t:transform[]):string;

//export parse=parse;

export interface point {x:number, y:number}

export type transform = translate | scale | rotate | skewX | skewY | matrix;

export interface translate {
    readonly type: "translate"
    tx:number;
    ty:number;
}

export interface scale {
    readonly type: "scale"
    sx:number;
    sy?:number;
}

export interface rotate { 
    // rotate about another point (c) 
    readonly type: "rotate"
    angle:number;
    cx?:number;
    cy?:number;
}

export interface skewX {
    readonly type: "skewX"
    angle:number;
}

export interface skewY {
    readonly type: "skewY";
    angle:number;
}

export interface matrix {
    readonly type: "matrix"
    a:number;
    b:number;
    c:number;
    d:number;
    e:number;
    f:number;
}


