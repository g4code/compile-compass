var fs              = require('fs')
var path            = require('path')

var configPath      = null
var configDirName   = null

function buildPath(filePath) {
    return path.isAbsolute(filePath) ?
        path.normalize(filePath) :
        path.join(configDirName, filePath)
}

function normalizeConfigPath(filePath)
{
    return path.isAbsolute(filePath) ?
        path.normalize(filePath) :
        path.join(process.cwd(), filePath)
}

var Options = function(pathToConfig, watch) {

    configPath    = normalizeConfigPath(pathToConfig)
    configDirName = path.dirname(configPath)

    var rawData       = fs.readFileSync(configPath, 'utf8');
    var data          = JSON.parse(rawData)

    this.watch        = watch !== undefined && watch
    this.import_paths = data.import_paths.map(buildPath)
    this.css_dir      = buildPath(data.css_dir)
    this.sass_dir     = buildPath(data.sass_dir)
}

Options.prototype = {}

module.exports = Options