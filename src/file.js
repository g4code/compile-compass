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

    getDestinationPathForMap: function()
    {
        return this.getDestinationPath() + '.map'
    },

    getSourceFilename: function()
    {
        return this.sourcePath.replace(this.options.sass_dir, '')
    },

    getSourcePath: function()
    {
        return this.sourcePath
    },

    writeToDestinationCssPath: function(content)
    {
        fs.outputFile(this.getDestinationPath(), content, this.onWriteToDestinationCssPath.bind(this))
    },

    writeToDestinationMapPath: function(content)
    {
        fs.outputFile(this.getDestinationPathForMap(), content, this.onWriteToDestinationMapPath.bind(this))
    },

    onWriteToDestinationCssPath: function(error)
    {
        error ?
            evento.trigger('INFORMER|ERROR', error) :
            evento.trigger('INFORMER|SUCCESS', 'write ' + this.getDestinationPath())
    },

    onWriteToDestinationMapPath: function(error)
    {
        error ?
            evento.trigger('INFORMER|ERROR', error) :
            evento.trigger('INFORMER|SUCCESS', 'write ' + this.getDestinationPathForMap())
    }
}

module.exports = File