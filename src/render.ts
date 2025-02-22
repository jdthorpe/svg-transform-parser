import {TRANSFORM} from "../types";

export function render(x: TRANSFORM | TRANSFORM[]): string {
  if (x instanceof Array) return x.map(_render).join(" ");
  return _render(x);
}

function _render(x: TRANSFORM) {
  // renders a single transform

  var args: number[];
  switch (x.type) {
    case "translate":
      args = x.ty ? [x.tx, x.ty] : [x.tx];
      break;
    case "scale":
      args = x.sy ? [x.sx, x.sy] : [x.sx];
      break;
    case "rotate":
      args = x.cx ? [x.angle, x.cx, x.cy || 0] : [x.angle];
      break;
    case "skewX":
      args = [x.angle];
      break;
    case "skewY":
      args = [x.angle];
      break;
    case "matrix":
      args = [x.a, x.b, x.c, x.d, x.e, x.f];
      break;
    default:
      throw new Error(`Unkonwkn type ${(<any>x).type}`);
  }
  return `${x.type}(${args.join(" ")})`;
}
