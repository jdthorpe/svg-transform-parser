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

// invert and apply the reverse transformation

tx.asMatrix().inverse().apply([ 291.32799384885755, 149.9066376115481 ])
>> [ 5, 10.000000000000007 ] // Yes, there a bit or rounding error on the round trip...

tx.asMatrix().inverse().apply({ x: 291.32799384885755, y: 149.9066376115481 })
>> { x: 5, y: 10.000000000000007 } // Yes, there a bit or rounding error on the round trip...

// merge transforms
var tx_part_1 = transform("rotate(45) scale(2)").asMatrix()
var tx_part_2 = transform("translate(10,100) matrix(1 2 3 4 5 6)").asMatrix()
tx_part_1.dot(tx_part_2).apply( [5, 10] )
>> [ 291.32799384885755, 149.9066376115481 ]

```

* Also plays nice with TypeScript

<!-- 

var MOD = require( "./index")
var transform = require( "./index").transform
var Matrix = require( "./index").Matrix

var tx = transform("rotate(45) scale(2) translate(10,100) matrix(1 2 3 4 5 6)")

tx.apply( [5, 10] ) 

tx.apply({x:5, y:10}) 

tx.render()

tx.asMatrix().render()

tx.asMatrix().inverse().apply({x:5,y:10})

tx.asMatrix().inverse().apply([ 291.32799384885755, 149.9066376115481 ])

tx.asMatrix().inverse().apply({ x: 291.32799384885755, y: 149.9066376115481 })

var tx_part_1 = transform("rotate(45) scale(2)").asMatrix()
var tx_part_2 = transform("translate(10,100) matrix(1 2 3 4 5 6)").asMatrix()
tx_part_1.dot(tx_part_2).apply( [5, 10] )

a = 2
b = 3
c = 5
d = 7
e = 11
f = 13

det = a * d + b * c

-->
