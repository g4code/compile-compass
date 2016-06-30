var options             = require('./options')
var fs                  = require('fs')
var sass                = require('node-sass')
var compassFunctions    = require('./compass-functions')
var cssImporter         = require('node-sass-css-importer')
var spritesImporter     = require('./imports/sprites')
var evento              = require('evento')

var Compiler = function(options, file) {
    this.file    = file
    this.cssImporter = cssImporter({
        import_paths: options.import_paths
    })
    this.spritesImporter = spritesImporter({
        sprite_load_path    : options.sprite_load_path,
        generated_images_dir: options.generated_images_dir,
    })
}

Compiler.prototype = {

    compile: function () {

        sass.render({
            functions   : compassFunctions,
            file        : this.file.getSourcePath(),
            outFile     : this.file.getDestinationPath(),
            sourceMap   : true,
            sourceMapContents: true,
            importer    : [this.cssImporter, this.spritesImporter]
        }, this.onRender.bind(this))
    },

    onRender: function(error, result)
    {
        if (error) {
            evento.trigger('INFORMER|ERROR', error)
        } else {
            evento.trigger('COMPILER|STATS', result.stats)
            this.file.writeToDestinationCssPath(result.css)
            this.file.writeToDestinationMapPath(result.map)
        }
    }

}

module.exports = Compiler