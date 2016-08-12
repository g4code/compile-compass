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

    writeToDestinationCssPath: function(content, callback)
    {
        fs.outputFile(this.getDestinationPath(), content, callback)
    },

    writeToDestinationMapPath: function(content, callback)
    {
        fs.outputFile(this.getDestinationPathForMap(), content, callback)
    }
}

module.exports = File