var convert = require('color-convert');

module.exports = hslToXY;

function hslToXY(subcmd, opts, args, cb) {
    var self = this;

    if (opts.help) {
        self.do_help('help', {}, [subcmd], cb);
        return;
    }

    var h = args.shift();
    var s = args.shift();
    var l = args.shift();
    if (!h || !s || !l) {
        cb(new Error('H (0-359), S (0-100), L (0-100) values required'));
        return;
    }

    var xyz = convert.hsl.xyz([h, s, l])
    var x = xyz[0] / (xyz[0] + xyz[1] + xyz[2]);
    var y = xyz[1] / (xyz[0] + xyz[1] + xyz[2]);
    cb('x = ' + x + ", y = " + y);
}

hslToXY.options = [
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Show this help.'
    }
];
hslToXY.help = 'Convert HSL color to XY\n\n{{options}}';
