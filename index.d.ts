
export function parse(s:string):transform[];

//export parse=parse;

export type transform = translate | scale | rotate | skewX | skewY | matrix;

export interface translate {
    readonly type: "translate"
}

export interface scale {
    readonly type: "scale"
    sx:number;
    sy?:number;
}

export type rotate = orotate | crotate;

interface orotate { 
    // rotate about the origin 
    readonly type: "rotate"
    angle:number;
}

interface crotate { 
    // rotate about another point (c) 
    readonly type: "rotate"
    angle:number;
    cx:number;
    cy:number;
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


