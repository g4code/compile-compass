var evento      = require('evento')
var recursive   = require('recursive-readdir')

var Filer = function(options) {

    this.options    = options
    this.files      = []

    recursive(options.sass_dir, ['_*.scss'], this.onRecursive.bind(this));
}

Filer.prototype = {

    onRecursive: function(err, files)
    {
        if (err) {
            evento.trigger('INFORMER|ERROR', err)
        } else {
            this.files = files
            evento.trigger('FILER|READ')
        }
    }
}

module.exports = Filer
