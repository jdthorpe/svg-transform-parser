# ya-svg-transform

Yet another SVG transform parser.

## Installation

    npm install ya-svg-transform

## Usage

```javascript
import { transform } from "ya-svg-transform"

var tx = transform("rotate(45) scale(2) translate(10,100) matrix(1 2 3 4 5 6)")

tx.apply( [5, 10] ) 
>> [ 291.32799384885755, 149.9066376115481 ]

tx.apply({x:5, y:10}) 
>> { x: 291.32799384885755, y: 149.9066376115481 }

tx.render()
>> "rotate(45) scale(2) translate(10 100) matrix(1 2 3 4 5 6)"

tx.asMatrix().render()
>> "matrix(4.242640687119285 1.4142135623730954 9.899494936611665 1.4142135623730958 171.1198410471445 128.69343417595167)"
```


* Also plays nice with TypeScript

