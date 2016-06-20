var fs      = require('fs-extra')
var evento  = require('evento')

var File = function(sourcePath, options) {
    this.sourcePath = sourcePath
    this.options    = options
}

File.prototype = {

    getDestinationPath: function()
    {
        return this.sourcePath.replace(this.options.sass_dir, this.options.css_dir).replace('.scss', '.css')
    },

    getSourcePath: function()
    {
        return this.sourcePath
    },

    writeToDestinationPath: function(content)
    {
        fs.outputFile(this.getDestinationPath(), content, this.onWriteToDestinationPath.bind(this))
    },

    onWriteToDestinationPath: function(error)
    {
        if (error) {
            evento.trigger('INFORMER|ERROR', error)
        } else  {
            evento.trigger('INFORMER|SUCCESS', 'write ' + this.getDestinationPath())
        }
    }
}

module.exports = File