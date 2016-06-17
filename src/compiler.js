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
            importer    : [this.cssImporter]
        }, this.onRender.bind(this))
    },

    onRender: function(error, result)
    {
        if (error) {
            console.log(error)
        } else {
            fs.writeFile(this.file.getDestinationPath(), result.css, this.onWriteFIle.bind(this))
        }
    },

    onWriteFIle: function(error)
    {
        if (error) {
            console.log(error)
        } else  {
            evento.trigger('INFORMER|SUCCESS', 'write ' + this.file.getDestinationPath())
        }
    }

}

module.exports = Compiler