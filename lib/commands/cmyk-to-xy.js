var convert = require('color-convert');

module.exports = cmykToXY;

function cmykToXY(subcmd, opts, args, cb) {
    var self = this;

    if (opts.help) {
        self.do_help('help', {}, [subcmd], cb);
        return;
    }

    var c = args.shift();
    var m = args.shift();
    var y = args.shift();
    var k = args.shift();
    if (!c || !m || !y || !k) {
        cb(new Error('C (0-100), M (0-100), Y (0-100), K (0-100) values required'));
        return;
    }

    var xyz = convert.cmyk.xyz([c, m, y, k])
    var x = xyz[0] / (xyz[0] + xyz[1] + xyz[2]);
    var y = xyz[1] / (xyz[0] + xyz[1] + xyz[2]);
    cb('x = ' + x + ", y = " + y);
}

cmykToXY.options = [
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Show this help.'
    }
];
cmykToXY.help = 'Convert CMYK color to XY\n\n{{options}}';
