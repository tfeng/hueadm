var common = require('../common');

module.exports = modifyScene;

function modifyScene(subcmd, opts, args, cb) {
    var self = this;

    var data;
    var finish = common.makeFinisher(opts, cb);

    if (opts.help) {
        self.do_help('help', {}, [subcmd], cb);
        return;
    }

    var id = args.shift();

    if (!id) {
        cb(new Error('first argument must be supplied'));
        return;
    }

    var light = args.shift();
    if (!light) {
        cb(new Error('second argument must be supplied'));
        return;
    }

    try {
        data = common.kvToObj(args, {allowStdin: true});
    } catch (e) {
        cb(e);
        return;
    }

    self.debug('modifyScene(%s, %d, %j)', id, light, data);

    self.client.modifyScene(id, light, data, finish);
}

modifyScene.options = [
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Show this help.'
    },
    {
        names: ['json', 'j'],
        type: 'bool',
        help: 'JSON output.'
    }
];
modifyScene.help = 'Modify a scene\n\n{{options}}';
