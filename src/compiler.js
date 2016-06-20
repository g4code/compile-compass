var options     = require('./options')
var fs          = require('fs')
var sass        = require('node-sass')
var functions   = require('./functions')
var cssImporter = require('node-sass-css-importer')
var evento      = require('evento')

var Compiler = function(options, file) {
    this.file    = file
    this.cssImporter = cssImporter({
        import_paths: options.import_paths
    })
}

Compiler.prototype = {

    compile: function () {

        sass.render({
            functions   : functions,
            file        : this.file.getSourcePath(),
            outFile     : this.file.getDestinationPath(),
            sourceMap   : true,
            sourceMapContents: true,
            importer    : [this.cssImporter]
        }, this.onRender.bind(this))
    },

    onRender: function(error, result)
    {
        if (error) {
            evento.trigger('INFORMER|ERROR', error)
        } else {
            this.file.writeToDestinationCssPath(result.css)
            this.file.writeToDestinationMapPath(result.map)
        }
    }

}

module.exports = Compiler