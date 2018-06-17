var expect = require('chai').expect,
    stp = require('../index');

describe('#escape', function() {
  var testSet = [
    ["translate(1.6,65.44)", [{type:"translate", tx: 1.6, ty: 65.44}]],
    ["translate(777)", [{type:"translate", tx: 777}]],
    ["scale(51)", [{type:"scale", sx: 51}]],
    ["scale(51 22)", [{type:"scale", sx: 51, sy: 22}]],
    ["rotate(51)", [{type:"rotate", angle: 51}]],
    ["rotate(46 51)", {throw: true}],
    ["rotate(46 51, 18.57)", [{type:"rotate", angle: 46, cx: 51, cy: 18.57}]],
    ["skewX(19.08)", [{type:"skewX", angle: 19.08}]],
    ["skewX(19.08, 4)", {throw: true}],
    ["skewY(56.11)", [{type:"skewY", angle: 56.11}]],
    ["matrix(1 2 3,4,5 6)", [{type:"matrix", a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}]],
    ["matrix(1 2 3,45 6)", {throw: true}],
    ["translate(1,-1),rotate(2 0.2 0.5) skewX(3.3)  skewY(4),matrix(6,5,4,3,2,1)", [
      {type:"translate", tx: 1, ty: -1},
      {type:"rotate", angle: 2, cx: 0.2, cy: 0.5},
      {type:"skewX", angle: 3.3},
      {type:"skewY", angle: 4},
      {type:"matrix", a: 6, b: 5, c: 4, d: 3, e: 2, f: 1}
    ]],
  ];

  testSet.forEach(function(testCase) {
    var shouldBe = testCase[1];
    var fn = function() { return stp.parse(testCase[0]); }

    if (shouldBe.throw) {
      it('parsing ' + testCase[0] + ' should throw error', function() {
        expect(fn).to.throw();
      });
    } else {
      it('parse ' + testCase[0], function() {
        expect(fn()).to.deep.equal(shouldBe);
      });
    }
  });
});
