const evento      = require('evento')
const recursive   = require('recursive-readdir')
const path        = require('path')
const unique        = require('array-unique')

var Filer = function(options, ignorePattern) {

    this.options    = options
    this.files      = []
    this.dirs       = []

    ignorePattern ?
        recursive(options.sass_dir, [ignorePattern], this.onRecursive.bind(this)) :
        recursive(options.sass_dir, this.onRecursive.bind(this));
}

Filer.prototype = {

    onRecursive: function(err, files)
    {
        if (err) {
            evento.trigger('INFORMER|ERROR', err)
        } else {
            this.files = files
            this.findDirs()
            evento.trigger('FILER|READ')
        }
    },

    findDirs: function()
    {
        var arrayLength = this.files.length;
        for (var i = 0; i < arrayLength; i++) {
            this.dirs.push(path.dirname(this.files[i]))
        }
        this.dirs = unique(this.dirs)
    }
}

module.exports = Filer
