var parse = require('..');

var fs = require('fs');

var rxn = fs.readFileSync(__dirname + '/jsme.rxn', 'utf-8');

describe.only('RXN Parser', function () {
    var result = parse(rxn);

    it('Check result', function () {
        result.should.be.an.Object;
        result.should.have.properties('reagents', 'products');
    });

    it('Check products', function () {
        result.reagents.length.should.equal(4);
        result.products.length.should.equal(3);
    });
});
