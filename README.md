# ya-svg-transform

Yet another SVG transform parser.

## Installation

    npm install ya-svg-transform

## Usage

```javascript
import {transform, Matrix} from "ya-svg-transform";

var tx = transform("rotate(45) scale(2) translate(10,100) matrix(1 2 3 4 5 6)");

// Apply the transform to a point [x, y]
tx.apply([5, 10]) >> [291.32799384885755, 149.9066376115481];

// Apply the transform to a point {x, y}
tx.apply({x: 5, y: 10}) >> {x: 291.32799384885755, y: 149.9066376115481};

// Render the transform as an SVG transform string
tx.render() >> "rotate(45) scale(2) translate(10 100) matrix(1 2 3 4 5 6)";

// Render the transform as an SVG transform matrix
tx.asMatrix().render() >>
  "matrix(4.242640687119285 1.4142135623730954 9.899494936611665 1.4142135623730958 171.1198410471445 128.69343417595167)";

// Get the transform data and rehydrate (useful for manual transforms, e.g. tweening the transforms)
const tx_transforms = tx.asMatrix().transforms;
const tx2 = new Matrix(tx_transforms);

// Get the equivalent matrix and rehydrate (useful for manual transforms, e.g. tweening the equivalent matrix)
const tx_matrix = tx.asMatrix().matrix;
const tx3 = new Matrix(tx_matrix);

// Invert and apply the reverse transformation
tx.asMatrix().inverse().apply([291.32799384885755, 149.9066376115481]) >>
  [5, 10.000000000000007]; // Yes, rounding error is a fact of life with floating point arithmetic

tx.asMatrix().inverse().apply({x: 291.32799384885755, y: 149.9066376115481}) >>
  {x: 5, y: 10.000000000000007};

// Combine a sequence of transforms
var tx_part_1 = transform("rotate(45) scale(2)").asMatrix();
var tx_part_2 = transform("translate(10,100) matrix(1 2 3 4 5 6)").asMatrix();
tx_part_1.dot(tx_part_2).apply([5, 10]) >>
  [291.32799384885755, 149.9066376115481];
```
