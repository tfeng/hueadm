var convert = require('color-convert');

module.exports = rgbToXY;

function rgbToXY(subcmd, opts, args, cb) {
    var self = this;

    if (opts.help) {
        self.do_help('help', {}, [subcmd], cb);
        return;
    }

    var r = args.shift();
    var g = args.shift();
    var b = args.shift();
    if (!r || !g || !b) {
        cb(new Error('R, G, B values (0-255) required'));
        return;
    }

    var xyz = convert.rgb.xyz([r, g, b])
    var x = xyz[0] / (xyz[0] + xyz[1] + xyz[2]);
    var y = xyz[1] / (xyz[0] + xyz[1] + xyz[2]);
    cb('x = ' + x + ", y = " + y);
}

rgbToXY.options = [
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Show this help.'
    }
];
rgbToXY.help = 'Convert RGB color to XY\n\n{{options}}';
