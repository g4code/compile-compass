var fs = require('fs')
var path = require('path')

var Options = function(configPath) {

    this.configPath = this.normalizeConfigPath(configPath)
    this.configDirname = path.dirname(this.configPath)

    var rawData       = fs.readFileSync(this.configPath, 'utf8');
    var data          = JSON.parse(rawData)

    this.import_paths = data.import_paths.map(this.buildPath, this)
    this.css_dir      = this.buildPath(data.css_dir)
    this.sass_dir     = this.buildPath(data.sass_dir)
}

Options.prototype = {

    buildPath: function(filePath)
    {
        return path.isAbsolute(filePath) ?
            path.normalize(filePath) :
            path.join(this.configDirname, filePath)
    },

    normalizeConfigPath: function(configPath)
    {
        return path.isAbsolute(configPath) ?
            path.normalize(configPath) :
            path.join(process.cwd(), configPath)
    }
}

module.exports = Options