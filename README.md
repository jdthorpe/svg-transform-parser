svg-transform-parser
====================

Parse SVG transform in Javascript

## Installation

    npm install svg-transform-parser

## Usage

    var parseSvgTransform = require('svg-transform-parser').parse;

    parseSvgTransform("scale(5) translate(10,20)");
    // [ {type:"scale", sx: 5}, {type:"translate", tx: 10, ty: 20} ]

## Compile pegjs

    npm run-script compile

## Tests
  
    npm test
