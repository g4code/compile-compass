

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
    }
}

module.exports = File