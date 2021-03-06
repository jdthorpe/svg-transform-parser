"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("./render");
var Matrix = /** @class */ (function () {
    function Matrix(a, b, c, d, e, f) {
        this.type = "matrix";
        if (typeof a === "number") {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = e;
            this.f = f;
        }
        else {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
            this.d = a.d;
            this.e = a.e;
            this.f = a.f;
        }
    }
    Matrix.prototype.dot = function (other) {
        if (other.a) {
            return new Matrix(prod(this, other));
        }
        return apply(this, other);
    };
    Matrix.prototype.apply = function (pt) {
        if (pt instanceof Array) {
            return [
                this.a * pt[0] + this.c * pt[1] + this.e,
                this.b * pt[0] + this.d * pt[1] + this.f,
            ];
        }
        else {
            return {
                x: this.a * pt.x + this.c * pt.y + this.e,
                y: this.b * pt.x + this.d * pt.y + this.f,
            };
        }
    };
    Matrix.prototype.render = function () {
        return render_1.render(this);
    };
    Matrix.prototype.inverse = function () {
        return new Matrix(invert(this));
    };
    return Matrix;
}());
exports.Matrix = Matrix;
//-- export function asMatrix(x:transform ): Matrix;
//-- export function asMatrix(x:transform[] ): Matrix;
function transform_to_matrix(x) {
    // http://apike.ca/prog_svg_transform.html
    var out = { type: "matrix", a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
    switch (x.type) {
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
            var a = (Math.PI * x.angle) / 180;
            out.a = Math.cos(a);
            out.b = Math.sin(a);
            out.c = -Math.sin(a);
            out.d = Math.cos(a);
            if (x.cx !== undefined || x.cy !== undefined) {
                var cx = x.cx || 0;
                var cy = x.cy || 0;
                // https://stackoverflow.com/a/15134993/1519199
                out.e = -cx * Math.cos(a) + cy * Math.sin(a) + cx;
                out.f = -cx * Math.sin(a) - cy * Math.cos(a) + cy;
            }
            break;
        case "skewX":
            out.a = 1;
            out.d = 1;
            out.c = Math.tan((Math.PI * x.angle) / 180);
            break;
        case "skewY":
            out.a = 1;
            out.d = 1;
            out.b = Math.tan((Math.PI * x.angle) / 180);
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
            throw new Error("Unkonwn transform: " + JSON.stringify(x));
    }
    return out;
}
exports.transform_to_matrix = transform_to_matrix;
function invert(x) {
    var det = x.a * x.d - x.b * x.c;
    if (det === 0)
        throw new Error("Matrix is not invertable");
    return {
        type: "matrix",
        a: x.d / det,
        b: -x.b / det,
        c: -x.c / det,
        d: x.a / det,
        e: (x.f * x.c - x.e * x.d) / det,
        f: (x.b * x.e - x.a * x.f) / det,
    };
}
exports.invert = invert;
function prod(x, y) {
    var a = x.a * y.a + x.c * y.b;
    var b = x.b * y.a + x.d * y.b;
    var c = x.a * y.c + x.c * y.d;
    var d = x.b * y.c + x.d * y.d;
    var e = x.a * y.e + x.c * y.f + x.e;
    var f = x.b * y.e + x.d * y.f + x.f;
    return { type: "matrix", a: a, b: b, c: c, d: d, e: e, f: f };
}
exports.prod = prod;
function apply(x, pt) {
    if (pt instanceof Array) {
        return [
            x.a * pt[0] + x.c * pt[1] + x.e,
            x.b * pt[0] + x.d * pt[1] + x.f,
        ];
    }
    else {
        return {
            x: x.a * pt.x + x.c * pt.y + x.e,
            y: x.b * pt.x + x.d * pt.y + x.f,
        };
    }
}
exports.apply = apply;
