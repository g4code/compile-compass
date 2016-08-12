const options             = require('./options')
const fs                  = require('fs')
const sass                = require('node-sass')
const compassFunctions    = require('./compass-functions')
const cssImporter         = require('node-sass-css-importer')
const spritesImporter     = require('./imports/sprites')
const evento              = require('evento')
const File                = require('./file')

var Compiler = function(options, oneFile) {

    this.file    = oneFile
    this.cssImporter = cssImporter({
        import_paths: options.import_paths
    })
    this.spritesImporter = spritesImporter({
        sprite_load_path    : options.sprite_load_path,
        generated_images_dir: options.generated_images_dir,
    })
    this.status = 0
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

    //TODO change messages
    onRender: function(error, result)
    {
        if (error) {
            process.send({code: 'INFORMER|ERROR', message: error})
            process.exit(1)
        } else {
            process.send({code: 'COMPILER|STATS', message: result.stats})
            this.file.writeToDestinationCssPath(result.css, this.onWriteToDestinationCssPath.bind(this))
            this.file.writeToDestinationMapPath(result.map, this.onWriteToDestinationMapPath.bind(this))
        }
    },

    //TODO change messages
    onWriteToDestinationCssPath: function(error)
    {
        error ?
            process.send({code: 'INFORMER|ERROR', message: error}) :
            process.send({code: 'INFORMER|SUCCESS', message: 'write ' + this.file.getDestinationPath()})

        this.status = this.status + 1
        this.status == 2 && process.exit(0)
    },

    //TODO change messages
    onWriteToDestinationMapPath: function(error)
    {
        error ?
            process.send({code: 'INFORMER|ERROR', message: error}) :
            process.send({code: 'INFORMER|SUCCESS', message: 'write ' + this.file.getDestinationPathForMap()})

        this.status = this.status + 1
        this.status == 2 && process.exit(0)
    }
}

process.on('message', function(message) {

    new Compiler(message.options, new File(message.oneFile, message.options)).compile()
});