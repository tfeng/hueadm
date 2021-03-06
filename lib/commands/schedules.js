var tabula = require('tabula');

var common = require('../common');

module.exports = schedules;

// columns default without -o
var columnsDefault = 'id,name,status,creation,description';

// sort default with -s
var sortDefault = 'id';

function schedules(subcmd, opts, args, cb) {
    var self = this;

    if (opts.help) {
        self.do_help('help', {}, [subcmd], cb);
        return;
    }

    var columns = columnsDefault;
    if (opts.o)
        columns = opts.o;
    columns = columns.split(',');

    var sort = opts.s.split(',');

    var listOpts;
    try {
        listOpts = common.kvToObj(args);
    } catch (e) {
        cb(e);
        return;
    }

    self.client.schedules(function(err, data) {
        if (err) {
            cb(err);
            return;
        }

        if (opts.json) {
            console.log(JSON.stringify(data, null, 2));
            cb();
            return;
        }

        // convert schedules data into array
        var d = [];
        Object.keys(data).forEach(function (id) {
            data[id].id = id;
            data[id].creation = common.human(new Date(data[id].created));
            d.push(data[id]);
        });

        // filter based on listOpts
        d = common.filterArrayByKv(d, listOpts);

        // print the data
        tabula(d, {
            skipHeader: opts.H,
            columns: columns,
            sort: sort
        });

        cb();
    });
}

schedules.options = [
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Show this help.'
    }
].concat(common.getCliTableOptions({
    sortDefault: sortDefault
}));

schedules.help = 'List all schedules\n\n{{options}}';
