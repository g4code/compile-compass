var evento      = require('evento')
var recursive   = require('recursive-readdir')

var Filer = function(options) {

    this.options    = options
    this.files      = []
    this.nextIndex  = 0

    recursive(options.sass_dir, ['_*.scss'], this.onRecursive.bind(this));
}

Filer.prototype = {

    onRecursive: function(err, files)
    {
        if (err) {
            console.log(err)
        } else {
            this.files = files
            evento.trigger('FILER|READ')
        }
    }
}

module.exports = Filer
