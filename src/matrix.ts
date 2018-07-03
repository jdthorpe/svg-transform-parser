import { transform, translate , scale , rotate , skewX , skewY , matrix, point } from "../index.d"
import { Transform } from "./transform"
import { render } from "./render"

export class Matrix {

    readonly type = "matrix"
    public a: number;
    public b: number;
    public c: number;
    public d: number;
    public e: number;
    public f: number;

    constructor(a: matrix|Matrix)
    constructor(a: number, b: number, c: number, d: number, e: number, f: number)
    constructor(a: matrix|Matrix|number,
                b?: number,
                c?: number,
                d?: number,
                e?: number,
                f?: number){
        if(typeof a === "number"){
            this.a = a;
            this.b = (<number>b);
            this.c = (<number>c);
            this.d = (<number>d);
            this.e = (<number>e);
            this.f = (<number>f);
        }else{
            this.a = a.a
            this.b = a.b
            this.c = a.c
            this.d = a.d
            this.e = a.e
            this.f = a.f
        }
    }

    dot(other:Matrix|matrix):Matrix;
    dot(other:point):point;
    dot(other:Matrix|matrix|point):point|Matrix{

        if((<matrix>other).a){
            return new Matrix(prod(this,<matrix>other))
        }
        return apply(this,<point>other)
    }

    render():string{
        return render(this);
    }

}

//-- export function asMatrix(x:transform ): Matrix;
//-- export function asMatrix(x:transform[] ): Matrix;
export function transform_to_matrix(x:transform): matrix{
    // http://apike.ca/prog_svg_transform.html 
    var out:matrix = {type: "matrix", a:0, b:0, c:0, d:0, e:0, f:0,};
    switch(x.type){
        case "translate":
            out.a = 1;
            out.d = 1;
            out.e = x.tx;
            out.f = x.ty || 0;
            break;
        case "scale":
            out.a = x.sx;
            out.d = x.sy ? x.sy : x.sx;
            break;
        case "rotate":
            let a = x.angle;
            out.a = Math.cos(Math.PI * a / 180);
            out.c = Math.sin(Math.PI * a / 180);
            out.b = -Math.sin(Math.PI * a / 180);
            out.d = Math.cos(Math.PI * a / 180);
            if(x.cx !== undefined || x.cy !== undefined){
                // https://stackoverflow.com/a/15134993/1519199 
                out.e = -(x.cx || 0) * Math.cos(Math.PI * a / 180) + (x.cy || 0) * Math.sin(Math.PI * a / 180) + (x.cx || 0)
                out.f = -(x.cx || 0) * Math.sin(Math.PI * a / 180) - (x.cy || 0) * Math.cos(Math.PI * a / 180) + (x.cy || 0)
            }
            break;
        case "skewX":
            out.a = 1;
            out.d = 1;
            out.c = Math.tan(Math.PI * x.angle / 180);
            break;
        case "skewY":
            out.a = 1;
            out.d = 1;
            out.b = Math.tan(Math.PI * x.angle / 180);
            break;
        case "matrix":
            out.a = x.a;
            out.b = x.b;
            out.c = x.c;
            out.d = x.d;
            out.e = x.e;
            out.f = x.f;
            break;
        default:
            throw new Error("Unkonwn transform: " + JSON.stringify(x))
    }
    return out;
}

export function invert(x: matrix): matrix{
    var det: number = x.a * x.d - x.b * x.c;
    if(det === 0)
        throw new Error("Matrix is not invertable")

        var a =   x.d / det;
        var b = - x.b / det;

        var c = - x.c / det;
        var d =   x.a / det;

        var e = - x.e / ((x.a + x.b));
        var f = - x.f / ((x.c + x.d));

    return { type: "matrix", a: a, b: b, c: c, d: d, e: e, f: f, }
}

export function prod(x: matrix,y: matrix): matrix{
    var a = x.a * y.a + x.c * y.b;
    var b = x.b * y.a + x.d * y.b;

    var c = x.a * y.c + x.c * y.d;
    var d = x.b * y.c + x.d * y.d;

    var e = x.a * y.e + x.c * y.f + x.e;
    var f = x.b * y.e + x.d * y.f + x.f;

    return { type: "matrix", a: a, b: b, c: c, d: d, e: e, f: f, }
}


export function apply(x: matrix,pt: number[]): number[];
export function apply(x: matrix,pt: point): point;
export function apply(x: matrix,pt: point|number[]): point | number[]{
    if(pt instanceof Array){
        return [
             x.a * pt[0] + x.c * pt[1] + x.e,
             x.b * pt[0] + x.d * pt[1] + x.f,
        ]
    }else{
        return {
            x: x.a * pt.x + x.c * pt.y + x.e,
            y: x.b * pt.x + x.d * pt.y + x.f,
        }
    }
}




