"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse_svg_transform_1 = require("../parse-svg-transform");
var render_1 = require("./render");
var matrix_1 = require("./matrix");
function transform(x) {
    return new Transform(x);
}
exports.transform = transform;
var Transform = /** @class */ (function () {
    function Transform(x) {
        if (x instanceof Array) {
            this.transforms = x;
        }
        else {
            this.transforms = parse_svg_transform_1.parse(x);
        }
    }
    Transform.prototype.asMatrix = function () {
        return new matrix_1.Matrix(this.transforms.map(matrix_1.transform_to_matrix).reduce(matrix_1.prod));
    };
    Transform.prototype.dot = function (other) {
        if (other.x === undefined) {
            return this.asMatrix().dot(other);
        }
        else {
            return this.asMatrix().dot(other);
        }
    };
    Transform.prototype.apply = function (other) {
        if (other instanceof Array) {
            return matrix_1.apply(this.asMatrix(), other);
        }
        else {
            return matrix_1.apply(this.asMatrix(), other);
        }
    };
    Transform.prototype.render = function () {
        return this.transforms.map(render_1.render).join(" ");
    };
    return Transform;
}());
exports.Transform = Transform;
