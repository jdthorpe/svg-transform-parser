import { transform, translate , scale , rotate , skewX , skewY , matrix } from "../index.d"

export function render(x:transform){

    // renders a single transform 

    var args:number[];
    switch(x.type){
        case "translate":
            args = x.ty ? [ x.tx, x.ty ] : [ x.tx ];
            break;
        case "scale":
            args = x.sy ? [ x.sx, x.sy ] : [ x.sx ];
            break;
        case "rotate":
            args = x.cx ? [x.angle, x.cx, x.cy || 0] : [x.angle];
            break;
        case "skewX":
            args = [ x.angle ];
            break;
        case "skewY":
            args = [ x.angle ];
            break;
        case "matrix":
            args = [ x.a, x.b, x.c, x.d, x.e, x.f, ];
            break;
        default: 
            throw new Error(`Unkonwkn type ${(<any>x).type}`)
    }
    return `${x.type}(${args.join(" ")})`
}

