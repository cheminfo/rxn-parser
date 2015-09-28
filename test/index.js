var parse = require('..');

var fs = require('fs');

var rxn = fs.readFileSync(__dirname + '/test.rxn', 'utf-8');

describe.only('RXN Parser', function () {
    var result = parse(rxn);

    it('Check result', function () {
        result.should.be.an.Object;
        result.should.have.properties('reagents', 'products');
    });

    it('Check products', function () {
        result.reagents.length.should.equal(2);
        result.products.length.should.equal(3);
    });

    it('should throw with non-string argument', function () {
        (function () {
            parse();
        }).should.throw(TypeError);
        (function () {
            parse(42);
        }).should.throw(TypeError);
        (function () {
            parse({});
        }).should.throw(TypeError);
    })
});
