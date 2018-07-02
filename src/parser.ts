
import { parse } from "../parse-svg-transform";
import { transform, matrix, point } from "../index.d"
import { render } from "./render";
import { transform_to_matrix, Matrix,  prod, apply }  from "./matrix"

export function transform(x:string):Transform{
    return new Transform(x)
}

export class Transform {

    private transforms: transform[];
    constructor( x: string | transform[]){
        if(x instanceof Array){
            this.transforms = x
        }else{
            this.transforms = parse(x)
        }
    }

    asMatrix():Matrix{
        return new Matrix(this.transforms.map(transform_to_matrix).reduce(prod))
    }

    dot(other:Matrix|matrix):Matrix;
    dot(other:point):point;
    dot(other:Matrix|matrix|point){
        if((<point>other).x === undefined){
            return this.asMatrix().dot(<point>other)
        }else{
            return this.asMatrix().dot(<Matrix>other)
        }
    }

    apply(pt: number[]): number[];
    apply(pt: point): point;
    apply(other:point|number[]): number[]|point{
        if(other instanceof Array){
            return <number[]>apply(this.asMatrix(),other)
        }else{
            return <point>apply(this.asMatrix(),other)
        }
    }


    render():string{
        return this.transforms.map(render).join(" ")
    }

}

